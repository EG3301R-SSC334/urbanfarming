import {getAllUsers, addNewUser, deleteAllUsers, getUser } from '../controllers/userController.js';
import express from 'express';
import asyncHandler from 'express-async-handler';
import {Users} from '../models/userSchema.js'
const userRouter = express.Router();

userRouter.route('/')
.get(getAllUsers)
.post(asyncHandler(addNewUser))
.delete(asyncHandler(deleteAllUsers))

userRouter.route('/:queryId')
.get(asyncHandler(getUser))
.post(asyncHandler(addNewUser))
.delete(asyncHandler(deleteAllUsers))

export default userRouter;