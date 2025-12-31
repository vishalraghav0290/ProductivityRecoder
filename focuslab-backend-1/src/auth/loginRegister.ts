import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../db/schema/user';

const router = express.Router();

// Middleware to authenticate the user (attach user to req.user)
export const authenticateUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers?.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Please authenticate.' });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ error: 'Please authenticate.' });
    next();
  } catch (err: any) {
    return res.status(401).json({ error: err.message || 'Please authenticate.' });
  }
};

// Function to register a new user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as any;
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already in use' });

    const user = new (User as any)({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
    const userObj = user.toObject();
    delete userObj.password;
    res.status(201).json({ user: userObj, token });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
};

// Function to login a user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as any;
    if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

    const user: any = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
    const userObj = user.toObject();
    delete userObj.password;
    res.json({ user: userObj, token });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
};


export default router;