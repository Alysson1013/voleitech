const db = require('../../../config/db')

module.exports = {
    async athletes_trainings_results(_, args, ctx) {
        return db
            .select(['athletes_training_results.id', 'athletes_training_results.collaborator_athlete_id', 'athletes_training_results.training_id', 'athletes_training_results.result_id', 'athletes_training_results.status'])
            .table('athletes_training_results')
            .innerJoin('collaborators', 'collaborators.id', 'athletes_training_results.collaborator_athlete_id')
            .innerJoin('collaborators_teams', 'collaborators_teams.collaborator_id', 'collaborators.id')
            .innerJoin('teams', 'collaborators_teams.team_id', 'teams.id')
            .innerJoin('team_category', 'team_category.id', 'teams.category_id')
            .whereRaw(`team_category.user_id = ${ctx.user.id}`)
    },
    async athlete_training_result(_, { filter }, ctx) {
        if (!filter) return null

        const { id } = filter

        if (id) {
            return db
                .select(['athletes_training_results.id', 'athletes_training_results.collaborator_athlete_id', 'athletes_training_results.training_id', 'athletes_training_results.result_id', 'athletes_training_results.status'])
                .table('athletes_training_results')
                .innerJoin('collaborators', 'collaborators.id', 'athletes_training_results.collaborator_athlete_id')
                .innerJoin('collaborators_teams', 'collaborators_teams.collaborator_id', 'collaborators.id')
                .innerJoin('teams', 'collaborators_teams.team_id', 'teams.id')
                .innerJoin('team_category', 'team_category.id', 'teams.category_id')
                .whereRaw(`athletes_training_results.id = ${id} AND team_category.user_id = ${ctx.user.id}`)
                .first()
        } else {
            return null
        }
    }
}