import express from 'express';
import { Systems } from '../models/systemSchema.js';
import { createNewSystem, deleteSystemData, getSystemData, updateSystemData } from '../controllers/systemController.js';

const systemRouter = express.Router();

systemRouter.route('/')
.get(getSystemData)
.post(createNewSystem)
.put(updateSystemData)
.delete(deleteSystemData);

export default systemRouter;