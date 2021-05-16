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
    },
    async user(_, { filter }) {
        if (!filter) return null
        const { id, email } = filter

        if (id) {
            return db('users')
            .where({ id })
            .first()
        } else if (email) {
            return db('users')
            .where({ email })
            .first()
        } else {
            return null
        }
    }
}