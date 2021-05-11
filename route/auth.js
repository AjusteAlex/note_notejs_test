const express = require('express')
const router = express.Router()
const User = require('../model/user')

router.post('/signup', async (req, res) => {
    try {
        const userAlreadyExists = await User.exists({ username: req.body.username });
        if (userAlreadyExists) {
            res.status(400).json({ message: 'Login already used' })
            return
        }

        const user = new User({
            username: req.body.username,
            password: User.generatePasswordHash(req.body.password)
        })

        const createdUser = await user.save()

        res.status(201).json(createdUser)
    } catch (exception) {
        res.sendStatus(500)
        console.error(exception)
    }
})

module.exports = router