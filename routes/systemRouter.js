import express from 'express';
import asyncHandler from 'express-async-handler';
import { addNewSystem, deleteSystemData, getAllData, deleteAllsystems, getSystemData, updateSystemData } from '../controllers/systemController.js';

const systemRouter = express.Router();

systemRouter.route('/')
.get(asyncHandler(getAllData))
.post(asyncHandler(addNewSystem))
.delete(asyncHandler(deleteAllsystems));

systemRouter.route('/:queryId')
.get(asyncHandler(getSystemData))
.put(asyncHandler(updateSystemData))
.delete(asyncHandler(deleteSystemData));

export default systemRouter;