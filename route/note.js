const express = require('express')
const router = express.Router()
const { Note } = require('../model/note')
const mongoose = require('mongoose')

router.get('/note/:note_id', async (req, res) => {

    const note = await Note.findById(req.params.note_id)
    res.send(note)
})

router.post('/note', async (req, res) => {
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
        if (exception instanceof mongoose.Error.ValidationError) {
            res.status(400).json({ message: exception.message })
            return
        }

        res.sendStatus(500)
        console.error(exception)
    }
})


module.exports = router