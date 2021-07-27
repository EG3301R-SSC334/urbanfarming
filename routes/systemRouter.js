import express from 'express';
import asyncHandler from 'express-async-handler';
import { Systems } from '../models/systemSchema.js';
import { createNewSystem, deleteSystemData, getAllData, deleteAlldata, getSystemData, updateSystemData } from '../controllers/systemController.js';

const systemRouter = express.Router();

systemRouter.route('/')
.get(getAllData)
.post(createNewSystem)
.delete(deleteAlldata);

systemRouter.route('/:queryId')
.get(asyncHandler(getSystemData))
.put(updateSystemData)
.delete(asyncHandler(deleteSystemData));

export default systemRouter;