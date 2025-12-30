import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app= express();


// allow origin from env (if set) or default to allow all in development
const corsOptions = process.env.CORS_ORIGIN ? { origin: process.env.CORS_ORIGIN } : undefined;
app.use(cors(corsOptions));


app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static('public'));
app.use(cookieParser());






export default app;