require('dotenv').config()
require('./datasource/mongo').config()

const express = require('express')
const app = express()
app.use(express.json())

const { NoteRouter } = require('./route/note')
const { AuthRouter } = require('./route/auth')

app.use('/', NoteRouter)
app.use('/auth', AuthRouter)

app.listen(process.env.PORT, () => {
    console.log(`Backend listening port ${process.env.PORT}`)
})