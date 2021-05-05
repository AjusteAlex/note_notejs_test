const express = require('express')
const app = express()

const mongoose = require('mongoose')
app.use(express.json())


const Note = mongoose.model('Note', {
    title: String,
    content: String,
});

app.get('/note/:note_id', async (req, res) => {
    const uri = "mongodb+srv://test_user:pouetpouet@cluster0.vs4af.mongodb.net/test_nodejs";
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

    const note = await Note.findById(req.params.note_id)
    res.send(note)
})

app.post('/note', async (req, res) => {
    try {
        const uri = "mongodb+srv://test_user:pouetpouet@cluster0.vs4af.mongodb.net/test_nodejs";
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

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