require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
app.use(express.json())


const Note = mongoose.model('Note', {
    title: String,
    content: String,
});

app.get('/note/:note_id', async (req, res) => {
    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

    const note = await Note.findById(req.params.note_id)
    res.send(note)
})

app.post('/note', async (req, res) => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

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