const express = require('express')
const app = express()

app.get('/note/:note_id', (req, res) => {
    const note = {
        id: req.params.note_id,
        title: "super note",
        content: "C'est vraiment tres interessant"
    }

    res.send(note)
})

app.post('/note', (req, res) => {
    const noteId = 'bidon'

    res
        .status(201)
        .header('Location', `/note/${noteId}`)
        .send({
            id: noteId,
            title: 'nouvelle note',
            content: 'rien a dire'
        })
})

app.listen(2000)