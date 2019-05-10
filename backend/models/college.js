const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collegeSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    roll: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('College', collegeSchema);