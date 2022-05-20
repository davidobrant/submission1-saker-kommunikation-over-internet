const express = require('express');
const router = express.Router();
const path = require('path');
const { verifyToken } = require('../middleware/verifyJWT');

router.get('^/$|/login(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'Frontend', 'views', 'login.html'))
});

router.get('/verify(.html)?',  (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'Frontend', 'views', 'verify.html'))
});

module.exports = router