const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

module.exports.Note = mongoose.model('Note', {
    author: { type: ObjectId, ref: 'User', required: true },//TODO factoriser 'User'
    title: { type: String, required: true },
    content: String,
});