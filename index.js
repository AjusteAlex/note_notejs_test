const express = require('express')
const app = express()
app.use(express.json())

require('dotenv').config()
require('./datasource/mongo').config()

const ValidationError = require('mongoose').Error.ValidationError
const { Note } = require('./model/note')

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
        if (exception instanceof ValidationError) {
            res.status(400)
            res.json(exception.message)
            return
        }
        res.sendStatus(500)
        console.error(exception)
    }
})


app.listen(process.env.PORT, () => {
    console.log(`Backend listening port ${process.env.PORT}`)
})