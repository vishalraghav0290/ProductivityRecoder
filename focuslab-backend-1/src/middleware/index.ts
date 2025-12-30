import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

export const authenticate = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    const token = authHeader ? String(authHeader).replace('Bearer ', '') : null;
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        return next();
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};

export default router;