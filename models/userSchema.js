import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pushToken: {
        type: [String],
        unique: true
    },
    profilePicture: {
        type: String
    },
    status: {
        type: String
    },
    systems: {
        type: [String]
    }
},{
    timestamps: true
});

export const Users = mongoose.model('User', userSchema);