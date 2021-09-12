import {getAllUsers, 
    addNewUser, 
    deleteAllUsers, 
    getUser, 
    updateUser, 
} from '../controllers/userController.js';
import express from 'express';
import asyncHandler from 'express-async-handler';

const userRouter = express.Router();

userRouter.route('/')
    .get(asyncHandler(getAllUsers))
    .post(asyncHandler(addNewUser))
    .delete(asyncHandler(deleteAllUsers))

userRouter.route('/:queryId')
    .get(asyncHandler(getUser))
    .put(asyncHandler(updateUser))
    .delete(asyncHandler(deleteAllUsers))


export default userRouter;