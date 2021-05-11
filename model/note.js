const mongoose = require('mongoose')

module.exports.Note = mongoose.model('Note', {
    title: String,
    content: String,
});