const express = require('express')
const app = express()

const mongoose = require('mongoose')
app.use(express.json())

require('dotenv').config()
require('./datasource/mongo').config()

const Note = mongoose.model('Note', {
    title: String,
    content: String,
});

app.get('/note/:note_id', async (req, res) => {
    const note = await Note.findById(req.params.note_id)
    res.send(note)
})

app.post('/note', async (req, res) => {
    try {
        const currentNote = new Note({
            title: req.body.title,
            content: req.body.content
        })

        const createdNote = await currentNote.save();
        
        res.setHeader('Location', `/note/${createdNote.id}`)
        res.status(201)
        res.send(createdNote)
    } catch (exception) {
        res.sendStatus(500)
        console.error(exception)
    }
})

app.listen(2000)