const db = require('../../../config/db')

const mutations = {
    async newCollaboratorTeam(_, { data }, ctx){
        ctx && ctx.userValidate()
        try {
            const [id] = await db('collaborators_teams')
                .insert(data)
            return db('collaborators_teams')
                .where({id})
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    }
}

module.exports = mutations