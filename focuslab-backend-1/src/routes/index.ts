import express from 'express';
import authRoutes from '../auth/index';
import userRouter from '../controllers/activity';
import userRoutes from '../controllers/user';

const router = express.Router();

// Define routes
router.use('/auth', authRoutes);
router.use('/activities', userRouter);
router.use('/users', userRoutes);

// Export the router
export default router;