import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import logger from 'morgan';
import systemRouter from './routes/systemRouter.js';
import userRouter from './routes/userRouter.js';

const __dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();
app.use(logger('dev'));
app.use(express.json({ limit: '5mb' }));

// Declare Routes
app.use('/users', userRouter);
app.use('/systems', systemRouter);

const connect = mongoose.connect(
    process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running...`)
});