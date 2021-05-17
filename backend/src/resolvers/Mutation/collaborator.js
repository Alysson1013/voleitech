const db = require('../../../config/db')

const mutations = {
    async newCollaborator(_, { data }) {
        try {
            const [id] = await db('collaborators')
                .insert(data)
            return db('collaborators')
                .where({ id })
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    }
}

module.exports = mutations