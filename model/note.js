const mongoose = require('mongoose')

module.exports.Note = mongoose.model(
    'Note',
    {
        title: { type: String, required: true, minLength: 5 },
        content: { type: String, required: true, minLength: 5 },
    });
