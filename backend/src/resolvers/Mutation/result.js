const db = require('../../../config/db')

const mutations = {
    async newResult(_, { data }, ctx) {
        ctx && ctx.userValidate()
        try {
            const [id] = await db('results')
                .insert(data)
            return db('results')
                .where({ id })
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    }
}

module.exports = mutations