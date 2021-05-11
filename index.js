require('dotenv').config()
require('./persistence/db').config()

const express = require('express')
const app = express()

app.use(express.json())

const noteRouter = require('./route/note')
app.use('/', noteRouter)

app.listen(process.env.PORT)