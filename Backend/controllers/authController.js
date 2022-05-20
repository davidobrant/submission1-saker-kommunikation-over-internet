const { comparePassword } = require('../utils/bcrypt');
const jwt = require('jsonwebtoken')
const { findUser } = require('../Model/usersDB')
require('dotenv').config()

const maxAge = 24*60*60
const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: maxAge
    })
}

const handleLogin = async (req, res) => {
    const { username, password } = req.body
    const resObj = {
        success: false, 
        token: ''
    }
    const foundUser = await findUser(username);
    if (foundUser === 'notFound') return res.sendStatus(401);
    const match = await comparePassword(password, foundUser[0].password)
    if (match) {
        resObj.success = true;
        resObj.token = createToken(foundUser[0].username)
        res.cookie('jwt', resObj.token, { httpOnly: true, expiresIn: 24*60*60*1000})
    } else {
        return res.sendStatus(403).redirect('/staff/login');
    }
    res.json(resObj)
}

  module.exports = { handleLogin }