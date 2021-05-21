const db = require('../../../config/db')

const mutations = {
    async newCollaborator(_, { data }, ctx) {
        ctx && ctx.userValidate()
        try {
            data.user_id = ctx.user.id
            const teams = data.teams 
            delete data.teams

            const [id] = await db('collaborators')
                .insert(data)

            for (let team of teams) {
                team.collaborator_id = id
                console.log(team)
                await db('collaborators_teams')
                    .insert(team)
            }

            return db('collaborators')
                .where({ id })
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    }
}

module.exports = mutations