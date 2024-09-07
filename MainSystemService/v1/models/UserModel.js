const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;