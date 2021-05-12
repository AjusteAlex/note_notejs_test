const express = require('express')
const router = express.Router()
const User = require('../model/user')
const jwt = require('jsonwebtoken')

function ensureUserAuthentified(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        res.sendStatus(401)
        return
    }

    const token = authHeader.split(' ')[1];
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
    } catch (exception) {
        res.sendStatus(401)
        return
    }

    next()
}

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
            user_id: user._id,
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

module.exports.router = router
module.exports.ensureUserAuthentified = ensureUserAuthentified