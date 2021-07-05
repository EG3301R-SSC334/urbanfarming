require('mongoose');
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
    plants: {
        type: [Plants]
    }
},{
    timestamps: true
});

var Users = mongoose.model('user', userSchema);

module.exports = Users;