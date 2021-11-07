import {getAllUsers, 
    addNewUser, 
    deleteAllUsers, 
    getUser, 
    updateUser,
    addUserSystem, 
} from '../controllers/userController.js';
import express from 'express';
import asyncHandler from 'express-async-handler';
import { verifyUser } from '../utils/passport.js';

const userRouter = express.Router();

userRouter.route('/')
    .get(asyncHandler(getAllUsers))
    .post(asyncHandler(addNewUser))
    .delete(asyncHandler(deleteAllUsers))

userRouter.route('/:queryId')
    .get(verifyUser, asyncHandler(getUser))
    .put(verifyUser, asyncHandler(updateUser))
    .delete(verifyUser, asyncHandler(deleteAllUsers))

userRouter.route('/:queryId/addsystem')
    .put(asyncHandler(addUserSystem))

export default userRouter;