const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    idBook: {
        type: Number,
        required: true
    },
    author: {
        type: String, 
        required: true
    },
    fine: {
        type: Number,
        default: 0
    },
    tag: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    reissueDate: {
        type: String,
        default: null
    }
}, {timestamps: true});

module.exports = mongoose.model('Book', bookSchema);