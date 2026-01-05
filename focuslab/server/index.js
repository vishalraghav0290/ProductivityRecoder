

import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'replace_this_with_a_secure_secret_in_prod';
const USERS_FILE = path.join(process.cwd(), 'server', 'users.json');

app.use(cors());
app.use(express.json());

function readUsers() {
  try {
    const content = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (err) {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

// Register
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'name, email and password required' });
  }

  const users = readUsers();
  const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: uuidv4(), name, email: email.toLowerCase(), password: hashed };
  users.push(user);
  writeUsers(users);

  // In a real app you might auto-login or send an email. We'll just return success.
  return res.status(201).json({ message: 'User created' });
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'email and password required' });

  const users = readUsers();
  const user = users.find(u => u.email === email.toLowerCase());
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  // Create JWT token. In production set a sensible expiration and use RS256 if you like.
  const token = jwt.sign({ sub: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '12h' });

  // Return token and minimal user info (no password)
  return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

// Protected endpoint - returns current user based on Authorization header
app.get('/api/auth/me', (req, res) => {
  const auth = req.headers.authorization || '';
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Unauthorized' });

  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // payload.sub is user id
    const users = readUsers();
    const user = users.find(u => u.id === payload.sub);
    if (!user) return res.status(401).json({ message: 'User not found' });
    return res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});
