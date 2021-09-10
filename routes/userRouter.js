import {getAllUsers, addNewUser, deleteAllUsers, getUser, updateUser, googleLogin } from '../controllers/userController.js';
import express from 'express';
import asyncHandler from 'express-async-handler';
import {Users} from '../models/userSchema.js'
const userRouter = express.Router();

userRouter.route('/')
.get(asyncHandler(getAllUsers))
.post(asyncHandler(addNewUser))
.delete(asyncHandler(deleteAllUsers))

userRouter.route('/:queryId')
.get(asyncHandler(getUser))
.put(asyncHandler(updateUser))
.post(asyncHandler(addNewUser))
.delete(asyncHandler(deleteAllUsers))

userRouter.route('/googleauth')
.post(asyncHandler(googleLogin))
export default userRouter;