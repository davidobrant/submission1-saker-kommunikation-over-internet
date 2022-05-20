require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

    const token = req.cookies.jwt
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next()
    })
}

module.exports = { verifyToken }