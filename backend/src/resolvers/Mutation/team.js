const db = require('../../../config/db')
const { team: getTeam } = require('../Query/team')

const mutations = {
    async newTeam(_, { data }, ctx) {
        ctx && ctx.userValidate()
        try {
            const [id] = await db('teams')
                .insert(data)
            return db('teams')
                .where({ id })
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    },
    async editTeam(_, { data, filter }, ctx) {
        ctx && ctx.userValidate()
        try {
            const teamData = await getTeam(_, { filter }, ctx)
            const id = teamData.id

            await db('teams')
                .where({ id })
                .update(data)

            return !teamData ? null : { ...teamData, ...data }
        } catch (error) {
            throw new Error(error)
        }
    },
    async deleteTeam(_, { filter }, ctx) {
        ctx && ctx.userValidate()
        try {
            const teamData = await getTeam(_, { filter }, ctx)
            const { id } = teamData
            console.log(id)
            const teamsIDs = await db
                .select(['teams.id AS teams_id', 'training.id as training_id', 'collaborators_teams.id AS collaborators_teams_id', 'collaborators.id AS collaborator_id', 'adresses.id AS adresses_id', 'athletes_training_results.id AS athletes_training_results_id', 'results.id AS result_id'])
                .table('teams')
                .leftJoin('collaborators_teams', 'collaborators_teams.team_id', 'teams.id')
                .leftJoin('collaborators', 'collaborators_teams.collaborator_id', 'collaborators.id')
                .leftJoin('adresses', 'adresses.colab_id', 'collaborators_teams.collaborator_id')
                .leftJoin('athletes_training_results', 'athletes_training_results.collaborator_athlete_id', 'collaborators.id')
                .leftJoin('results', 'athletes_training_results.result_id', 'results.id')
                .leftJoin('training', 'training.id', 'athletes_training_results.training_id')
                .whereRaw(`teams.id = ${id}`)

            for (let i in teamsIDs) {
                if (teamsIDs[i].athletes_training_results_id) {
                    await db('athletes_training_results')
                        .delete()
                        .whereRaw(`athletes_training_results.id = ${teamsIDs[i].athletes_training_results_id}`)
                }
                if (teamsIDs[i].adresses_id) {
                    await db('adresses')
                        .delete()
                        .whereRaw(`adresses.id = ${teamsIDs[i].adresses_id}`)
                }
                if (teamsIDs[i].result_id) {
                    await db('results')
                        .delete()
                        .whereRaw(`results.id = ${teamsIDs[i].result_id}`)
                }
                if (teamsIDs[i].collaborators_teams_id) {
                    await db('collaborators_teams')
                        .delete()
                        .whereRaw(`collaborators_teams.id = ${teamsIDs[i].collaborators_teams_id}`)
                }
                if (teamsIDs[i].training_id) {
                    await db('training')
                        .delete()
                        .whereRaw(`training.team_id = ${teamsIDs[i].teams_id}`)
                }
                if (teamsIDs[i].collaborator_id) {
                    await db('collaborators')
                        .delete()
                        .whereRaw(`collaborators.id = ${teamsIDs[i].collaborator_id}`)
                }
                if (teamsIDs[i].teams_id) {
                    await db('teams')
                        .delete()
                        .whereRaw(`teams.id = ${teamsIDs[i].teams_id}`)
                }
            }

            return teamData
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = mutations