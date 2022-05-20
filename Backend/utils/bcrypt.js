const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
}

const comparePassword = async (password, storedPassword) => {
    const match = await bcrypt.compare(password, storedPassword)
    return match
}

module.exports = { hashPassword, comparePassword }