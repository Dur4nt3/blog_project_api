import 'dotenv/config';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import './auth/passportConfig';

import authRouter from './routes/authRouter';
import usersRouter from './routes/usersRouter';
import postsRouter from './routes/postsRouter';

const app = express();

app.use(cookieParser());

if (
    process.env.READER_ENDPOINT === undefined ||
    process.env.AUTHOR_ENDPOINT === undefined
) {
    throw new Error('Reader and author endpoints are not set!');
}

app.use(
    cors({
        origin: [process.env.READER_ENDPOINT, process.env.AUTHOR_ENDPOINT],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
        optionsSuccessStatus: 200,
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).json({
        message: 'An unexpected error occurred',
    });
});

const appPort = process.env.PORT || 8080;

app.listen(appPort, (error) => {
    if (error) {
        throw error;
    }
    console.log('App running and listening on port: ', appPort);
});
