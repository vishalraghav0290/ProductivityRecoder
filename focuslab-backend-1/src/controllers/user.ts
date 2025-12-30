import express, { Request, Response } from 'express';
import User from '../db/schema/user';

const router = express.Router();

// List users (simple)
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create user (basic)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, passwordHash } = req.body as any;
    const user = await User.create({ name, email, passwordHash });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

export default router;
