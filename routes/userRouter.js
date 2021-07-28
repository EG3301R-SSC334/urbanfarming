import {getAllUsers, addNewUser} from '../controllers/userController.js';
import express from 'express';
import {Users} from '../models/userSchema.js'
const userRouter = express.Router();

userRouter.route('/')
.get(getAllUsers)
.post(addNewUser)

export default userRouter;