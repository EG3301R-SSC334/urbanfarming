import mongoose from 'mongoose';
import { dataSchema } from './dataSchema.js';

const Schema = mongoose.Schema;

const systemSchema = new Schema({
    systemName: {
        type: String,
    },
    ownerID: {
        type: String
    },
    lighting: {
        type: [Number]
    },
    plantType: {
        type: String,
        required: true
    },
    humidity: {
        type: [dataSchema],
        required: true
    },
    temperature: {
        type: [dataSchema],
        required: true
    },
    EC: {
        type: [dataSchema],
        required: true
    },
    level: {
        type: [dataSchema],
        required: true
    }
},{
    timestamps: true
});

export const Systems = mongoose.model('Systems', systemSchema);