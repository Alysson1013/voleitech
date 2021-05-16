const db = require("../../../config/db")
const bcrypt = require("bcrypt-nodejs")
const { getUserLogged } = require('../Common/User')

module.exports = {
    async login(_, { data }) {
        const user = await db('users')
            .where({ email: data.email })
            .first()

        if (!user) {
            throw new Error('User/Password Invalid')
        }

        const same = bcrypt.compareSync(data.password, user.password)

        if (!same) {
            throw new Error('User/Password Invalid')
        }

        return getUserLogged(user)
    },
    async users(_, args) {
        return db('users')
    }
}