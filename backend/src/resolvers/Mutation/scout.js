const db = require('../../../config/db')

const mutations = {
    async newScout(_, { data }, ctx) {
        ctx && ctx.userValidate()
        try {
            const [id] = await db('scouts')
                .insert(data)
            return db('scouts')
                .where({ id })
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    }
}

module.exports = mutations