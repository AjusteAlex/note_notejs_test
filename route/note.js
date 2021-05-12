const express = require('express')
const router = express.Router()
const { Note } = require('../model/note')
const mongoose = require('mongoose')
const { ensureUserAuthentified } = require('./auth')


router.get('/note/:note_id', async (req, res) => {

    const note = await Note.findById(req.params.note_id)
    res.send(note)
})

router.post('/note',
    ensureUserAuthentified,
    async (req, res) => {
        try {
            const currentNote = new Note({
                author: req.user.user_id,
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

router.put('/note/:note_id',
    ensureUserAuthentified,
    (req, res) => {
        res.status(200).send('modifié avec succes')
    })


module.exports = router