const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    plantType: {
        type: String,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    temperature: {
        type: [Number],
        required: true
    },
    pH: {
        type: Number,
        required: true
    },
    EC: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

var Plants = mongoose.model('plant', plantSchema);

module.exports = Plants;