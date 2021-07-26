const mongoose = require('mongoose');
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

module.exports = systemSchema;