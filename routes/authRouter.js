import express from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';
import {googleLogin} from '../controllers/authController.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const authRouter = express.Router();

authRouter.route('/google')
    .post(asyncHandler(googleLogin))

export default authRouter;