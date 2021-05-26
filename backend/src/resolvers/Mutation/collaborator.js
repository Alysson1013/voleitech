const db = require('../../../config/db')

const mutations = {
    async newCollaborator(_, { data }, ctx) {
        ctx && ctx.userValidate()
        try {
            data.user_id = ctx.user.id

            const teams = data.teams
            delete data.teams

            const adresses = data.adresses
            delete data.adresses

            const [id] = await db('collaborators')
                .insert(data)

            if (teams) {
                for (let team of teams) {
                    team.collaborator_id = id
                    await db('collaborators_teams')
                        .insert(team)
                }
            }

            if (adresses) {
                for (let address of adresses) {
                    address.colab_id = id
                    await db('adresses')
                        .insert(address)
                }
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