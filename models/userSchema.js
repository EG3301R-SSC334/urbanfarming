// import { Schema } from 'mongoose'
// import { plantSchema } from './plantSchema';
const plantSchema = require('./plantSchema')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
    plants: [plantSchema]
},{
    timestamps: true
});

var Users = mongoose.model('User', userSchema);

module.exports = Users;