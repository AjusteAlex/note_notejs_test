const express = require('express')
const app = express()

//GET /note/12345
app.get('/note/:note_id', (req, res) => {
    const note = {
        id: req.params.note_id,
        title: "super note",
        content: "C'est vraiment tres interessant"
    }

    res.send(note)
})

app.listen(2000)    