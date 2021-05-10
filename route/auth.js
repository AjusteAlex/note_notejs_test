const express = require('express')
const router = express.Router()

const { User } = require('../model/user')
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.sendStatus(401);
        return
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
};

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Filter user from the users array by username and password
        const user = await User.findOne({ username: username });
        if (user === undefined ||
            !User.validatePassword(password, user.password)) {
            res.status(401).json({ msg: 'wrong login/password' })
            return
        }

        // Generate an access token
        const accessToken = jwt.sign({ username: user.username, role: user.role }, jwtSecret);
        res.json({
            accessToken
        });
    } catch (exception) {
        res.send(500)
        console.error(exception)
    }
})

router.post('/signup', async (req, res) => {
    try {
        const { username, password, roles } = req.body;
        if (await User.exists({ username: username })) {
            res.status(401).json({ msg: 'Login already used' })
            return
        }

        const user = new User({
            roles: roles,
            username: username,
            password: User.generatePasswordHash(password)
        })
        await user.save();

        res
            .status(201)
            .send()
    } catch (exception) {
        res.send(500)
        console.error(exception)
    }
})

module.exports.authenticateJWT = authenticateJWT
module.exports.AuthRouter = router