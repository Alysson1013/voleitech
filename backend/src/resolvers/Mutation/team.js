const db = require('../../../config/db')

const mutations = {
    async newTeam(_, { data }, ctx) {
        try {
            ctx && ctx.userValidate()

            const [id] = await db('teams')
                .insert(data)
            return db('teams')
                .where({ id })
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    }
}

module.exports = mutations