import express, { NextFunction, Request, Response } from 'express';
import Activity from '../db/schema/activity';
import { authenticate } from '../middleware';

const router = express.Router();

// List activities (simple)
router.get('/habbit', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Create activity
router.post('/habbit', authenticate, async (req: Request, res: Response , next: NextFunction ) => {
  try {
    const { userId, name } = req.body as any;
    const activity = await Activity.create({ userId, name });
    res.status(201).json(activity);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create activity' });
  }
});

export default router;
