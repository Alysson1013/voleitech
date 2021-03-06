const db = require('../../../config/db')
const bcrypt = require('bcrypt-nodejs')

const mutations = {
    async signupUser(_, { data }) {
        try {
            //Criptografar Senha
            const salt = bcrypt.genSaltSync()
            data.password = bcrypt.hashSync(data.password, salt)

            const [id] = await db('users')
                .insert(data)

            return db('users')
                .where({ id })
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    },
}

module.exports = mutations