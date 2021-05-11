const express = require('express')
const router = express.Router()
const User = require('../model/user')
const jwt = require('jsonwebtoken')

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

router.get('/signin', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        if (user === null) {
            res.sendStatus(401)
            return
        }

        const isPasswordValid = User.validatePassword( req.body.password, user.password )

        if (!isPasswordValid) {
            res.sendStatus(401)
            return
        }

        const accessToken = jwt.sign({
            username: user.username
        }, process.env.JWT_SECRET);

        res.status(200).send({
            token: accessToken
        })
    } catch (exception) {
        res.sendStatus(500)
        console.error(exception)
    }
})

module.exports = router