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
    },
    temperature: {
        type: [dataSchema],
    },
    EC: {
        type: [dataSchema],
    },
    level: {
        type: [dataSchema],
    }
},{
    timestamps: true
});

export const Systems = mongoose.model('Systems', systemSchema);