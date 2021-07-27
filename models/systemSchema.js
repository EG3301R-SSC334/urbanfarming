import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const systemSchema = new Schema({
    systemID: {
        type: String,
        required: true,
        unique: true
    },
    systemName: {
        type: String,
    },
    ownerID: {
        type: String,
        unique: true
    },
    plantType: {
        type: String,
        required: true
    },
    humidity: {
        type: [Number],
        required: true
    },
    temperature: {
        type: [Number],
        required: true
    },
    pH: {
        type: [Number],
        required: true 
    },
    EC: {
        type: [Number],
        required: true
    }
},{
    timestamps: true
});

export const Systems = mongoose.model('Systems', systemSchema);