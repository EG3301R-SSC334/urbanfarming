import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import logger from 'morgan';
import passport from 'passport';
import systemRouter from './routes/systemRouter.js';
import userRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';
import { jwtPassport } from './utils/passport.js';

const __dirname = path.resolve();

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);

dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();
app.use(logger('dev'));
app.use(express.json({ limit: '5mb' }));

// Passport middleware
app.use(passport.initialize());

// Passport config
jwtPassport;

// Declare Routes
app.use('/users', userRouter);
app.use('/systems', systemRouter);
app.use('/auth', authRouter);

const connect = mongoose.connect(
    process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running...`)
});

