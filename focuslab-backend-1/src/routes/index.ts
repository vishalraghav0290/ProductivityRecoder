import express from 'express';
import authRoutes from './auth.route';
import userRouter from '../controllers/activity';
import userRoutes from '../controllers/user';
import imageUploadRoutes from '../controllers/imageUpload';
import habbit from '../controllers/activity';

const router = express.Router();

// Define routes
router.use('/api/auth', authRoutes);
router.use('/api/activities', userRouter);
router.use('/api/users', userRoutes);
router.use('/api/upload', imageUploadRoutes);
router.use('/api/habbit', habbit);

// Export the router
export default router;