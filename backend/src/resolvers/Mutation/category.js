const db = require('../../../config/db')
const { category: getCategory } = require('../Query/category')

const mutations = {
    async newCategory(_, { data }, ctx) {
        ctx && ctx.userValidate()
        try {
            data.user_id = ctx.user.id
            const [id] = await db('team_category')
                .insert(data)
            return db('team_category')
                .where({ id })
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    },
    async editCategory(_, { filter, data }, ctx) {
        ctx && ctx.userValidate()
        try {
            const categoryData = await getCategory(_, { filter }, ctx)
            const id = categoryData[0].id

            await db('team_category')
                .where({ id })
                .update(data)

            return !categoryData ? null : { ...categoryData[0], ...data }
        } catch (error) {
            throw new Error(error)
        }
    },
    async deleteCategory(_, { filter }, ctx) {
        ctx && ctx.userValidate()
        try {
            const categoryData = await getCategory(_, { filter }, ctx)
            const id = categoryData[0].id

            const categoryIDs = await db
                .select(['team_category.id AS category_id', 'teams.id AS teams_id', 'training.id as training_id', 'collaborators_teams.id AS collaborators_teams_id', 'collaborators.id AS collaborator_id', 'adresses.id AS adresses_id', 'athletes_training_results.id AS athletes_training_results_id', 'results.id AS result_id'])
                .table('team_category')
                .leftJoin('teams', 'teams.category_id', 'team_category.id')
                .leftJoin('collaborators_teams', 'collaborators_teams.team_id', 'teams.id')
                .leftJoin('collaborators', 'collaborators_teams.collaborator_id', 'collaborators.id')
                .leftJoin('adresses', 'adresses.colab_id', 'collaborators_teams.collaborator_id')
                .leftJoin('athletes_training_results', 'athletes_training_results.collaborator_athlete_id', 'collaborators.id')
                .leftJoin('results', 'athletes_training_results.result_id', 'results.id')
                .leftJoin('training', 'training.id', 'athletes_training_results.training_id')
                .whereRaw(`team_category.id = ${id}`)

            for (let i in categoryIDs) {
                if (categoryIDs[i].athletes_training_results_id) {
                    await db('athletes_training_results')
                        .delete()
                        .whereRaw(`athletes_training_results.id = ${categoryIDs[i].athletes_training_results_id}`)
                }
                if (categoryIDs[i].adresses_id) {
                    await db('adresses')
                        .delete()
                        .whereRaw(`adresses.id = ${categoryIDs[i].adresses_id}`)
                }
                if (categoryIDs[i].result_id) {
                    await db('results')
                        .delete()
                        .whereRaw(`results.id = ${categoryIDs[i].result_id}`)
                }
                if (categoryIDs[i].collaborators_teams_id) {
                    await db('collaborators_teams')
                        .delete()
                        .whereRaw(`collaborators_teams.id = ${categoryIDs[i].collaborators_teams_id}`)
                }
                if (categoryIDs[i].training_id) {
                    await db('training')
                        .delete()
                        .whereRaw(`training.id = ${categoryIDs[i].training_id}`)
                }
                if (categoryIDs[i].teams_id) {
                    await db('teams')
                        .delete()
                        .whereRaw(`teams.id = ${categoryIDs[i].teams_id}`)
                }
                if (categoryIDs[i].collaborator_id) {
                    await db('collaborators')
                        .delete()
                        .whereRaw(`collaborators.id = ${categoryIDs[i].collaborator_id}`)
                }
                if (categoryIDs[i].category_id) {
                    await db('team_category')
                        .delete()
                        .whereRaw(`team_category.id = ${categoryIDs[i].category_id}`)
                }
            }
            return categoryData[0]
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = mutations