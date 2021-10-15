import express from 'express';
import asyncHandler from 'express-async-handler';
import { addNewSystem, deleteSystemData, getAllData, deleteAllsystems, getSystemData, updateSensorData, updateSystemData, getFirstHundredData } from '../controllers/systemController.js';

const systemRouter = express.Router();

systemRouter.route('/')
.get(asyncHandler(getAllData))
.post(asyncHandler(addNewSystem))
.delete(asyncHandler(deleteAllsystems));

systemRouter.route('sensordata/:queryId/')
.put(asyncHandler(updateSensorData))

systemRouter.route('/:queryId')
.get(asyncHandler(getSystemData))
.put(asyncHandler(updateSystemData))
.delete(asyncHandler(deleteSystemData));

systemRouter.route('/:queryId/:length')
.get(asyncHandler(getFirstHundredData))

export default systemRouter;