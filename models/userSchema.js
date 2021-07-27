import mongoose from 'mongoose'
import systemSchema from './systemSchema.js';

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    userID: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    systems: {
        type: String
    }
},{
    timestamps: true
});

export const Users = mongoose.model('User', userSchema);