import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../db/schema/user';

const router = express.Router();

// Middleware to authenticate the user (attach user to req.user)
export const authenticateUser = async (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.header && (req.header('Authorization') || req.header('authorization'));
    const token = authHeader ? authHeader.replace('Bearer ', '') : null;
    if (!token) return res.status(401).send({ error: 'Please authenticate.' });
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

// Function to register a new user
export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body as any;
    const user = new (User as any)({ username, email, password });
    try {
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
};

// Function to login a user
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body as any;
    try {
        const user = await (User as any).findByCredentials(email, password);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
};

export default router;