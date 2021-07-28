import express from 'express';
import asyncHandler from 'express-async-handler';
import { addNewSystem, deleteSystemData, getAllData, deleteAlldata, getSystemData, updateSystemData } from '../controllers/systemController.js';

const systemRouter = express.Router();

systemRouter.route('/')
.get(getAllData)
.post(addNewSystem)
.delete(deleteAlldata);

systemRouter.route('/:queryId')
.get(asyncHandler(getSystemData))
.put(asyncHandler(updateSystemData))
.delete(asyncHandler(deleteSystemData));

export default systemRouter;