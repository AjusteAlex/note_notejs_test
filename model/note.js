const mongoose = require('mongoose')

module.exports.Note = mongoose.model('Note', {
    title: { type: String, required: true },
    content: String,
});