const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    authToken: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isUser: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', userSchema);