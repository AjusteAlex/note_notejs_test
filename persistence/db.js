const mongoose = require('mongoose')

async function config() {
    await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
}

module.exports.config = config