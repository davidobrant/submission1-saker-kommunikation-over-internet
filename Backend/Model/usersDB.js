const nedb = require('nedb-promise')
const usersDB = new nedb({ filename: './data/users.db', autoload: true})
const { hashPassword } = require('../utils/bcrypt')

/* ----- ----- ----- UsersDB ----- ----- ----- */
const createNewUser = async (username, password) => {
    const user = {
        username: username,
        password: await hashPassword(password)
    }
    usersDB.insert(user)
}
// createNewUser('admin', 'password')

const findUser = async (username) => {
    try {
        const foundUser = await usersDB.find({ username: username });
        if(foundUser.length == 0) return 'notFound'
        return foundUser
    } catch (err) {
        return 'notFound'
    }
}
// findUser('admin')

const clearUsersDB = async () => {
    usersDB.remove({}, {multi: true})
}
// clearUsersDB();

module.exports = { createNewUser, findUser }
