import express from 'express';
import { Systems } from '../models/systemSchema.js';
import { createNewSystem, deleteSystemData, getAllData, deleteAlldata, getSystemData, updateSystemData } from '../controllers/systemController.js';

const systemRouter = express.Router();

systemRouter.route('/')
.get(getAllData)
.post(createNewSystem)
.delete(deleteAlldata);

systemRouter.route('/test')
.get(getAllData)


systemRouter.route('/:queryId')
.get(getSystemData)
.put(updateSystemData)
.delete(deleteSystemData)

export default systemRouter;