const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reissueSchema = new Schema({
    studentName: {
        type: String
    },
    reissuedBooks: {
        type: Array,
        default: []
    },
    reissueRequest: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Reissue', reissueSchema);