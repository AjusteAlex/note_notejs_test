require('dotenv').config()

const express = require('express')
const app = express()


const mongoose = require('mongoose')
app.use(express.json())

const { Note } = require('./model/note')

require('./persistence/db').config()

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

app.listen(process.env.PORT)