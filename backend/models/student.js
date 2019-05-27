const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    roll: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    books: {
        type: Array,
        default: []
    },
    reissuedBooks: {
        type: Array,
        default: []
    },
    totalFine: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

module.exports = mongoose.model('Student', studentSchema);