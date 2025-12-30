// 1. Change this to just 'dotenv'
import dotenv from 'dotenv';
import connectDB from './db';
import app from './app';

// load env early
dotenv.config({ path: './.env' });

// connect to DB then start server
connectDB()
    .then(() => {
        const port = Number(process.env.PORT) || 8081;
        app.listen(port, () => {
            console.log('server is running on port', port);
        });
    })
    .catch((err: any) => {
        console.error('error while connecting to db', err);
        process.exit(1);
    });

