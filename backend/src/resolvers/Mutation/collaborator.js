const db = require('../../../config/db')
const { collaborator: getCollaborator } = require('../Query/collaborator')

const mutations = {
    async newCollaborator(_, { data }, ctx) {
        ctx && ctx.userValidate()
        try {
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
    },
    async editCollaborator(_, { filter, data }, ctx) {
        ctx && ctx.userValidate()
        try {
            const collaboratorData = await getCollaborator(_, { filter }, ctx)
            console.log(collaboratorData)
            const id = collaboratorData.id

            const teams = data.teams
            delete data.teams

            if (teams) {
                for (let team of teams) {
                    team.collaborator_id = id
                    await db('collaborators_teams')
                        .insert(team)
                }
            }

            await db('collaborators')
                .where({ id })
                .update(data)

            return !collaboratorData ? null : { ...collaboratorData, ...data }
        } catch (error) {
            throw new Error(error)
        }
    },
    async deleteCollaborator(_, { filter }, ctx) {
        ctx && ctx.userValidate()
        try {
            const collaboratorData = await getCollaborator(_, { filter }, ctx)
            console.log(collaboratorData)
            ctx && ctx.userValidatePropriety(collaboratorData.user_id)

            await db.raw(`
                DELETE results, athletes_training_results FROM results
                INNER JOIN athletes_training_results 
                ON athletes_training_results.result_id = results.id
                WHERE athletes_training_results.collaborator_athlete_id = ${collaboratorData.id}
            `)

            await db('adresses')
                .whereRaw(`adresses.colab_id = ${collaboratorData.id}`)
                .delete()

            await db('collaborators_teams')
                .whereRaw(`collaborators_teams.collaborator_id = ${collaboratorData.id}`)
                .delete()

            await db('collaborators')
                .whereRaw(`collaborators.id = ${collaboratorData.id}`)
                .delete()

            return collaboratorData
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = mutations