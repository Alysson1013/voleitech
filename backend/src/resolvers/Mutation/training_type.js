const db = require('../../../config/db')

const mutations = {
    async newTrainingType(_, { data }, ctx) {
        ctx && ctx.userValidate()
        try {
            const [id] = await db('training_type')
                .insert(data)
            return db('training_type')
                .where({ id })
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    }
}

module.exports = mutations