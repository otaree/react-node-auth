const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    google: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    profilePic: {
        type: String
    },
    gender: {
        type: String
    } 
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };