import mongoose from 'mongoose'

const Schema = mongoose.Schema;
export const dataSchema = new Schema({
    value: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    }
});