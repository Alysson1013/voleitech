const db = require('../../../config/db')

module.exports = {
    async collaborators(_, args, ctx) {
        return db
            .select(['collaborators.id', 'collaborators.phone_1', 'collaborators.phone_2', 'collaborators.phone_3', 'collaborators.email_1', 'collaborators.email_2', 'collaborators.email_3', 'collaborators.name', 'collaborators.dt_birth', 'collaborators.function AS function', 'collaborators.n_enrollment_atl', 'collaborators.n_enrollment_ast', 'collaborators.positions', 'collaborators.n_uniform', 'collaborators.height', 'collaborators.weight', 'collaborators.width', 'collaborators.gender', 'collaborators.bmi', 'collaborators.jump_distance', 'collaborators.jump_height', 'collaborators.describe', 'team_category.user_id'])
            .table('collaborators')
            .innerJoin('collaborators_teams', 'collaborators_teams.collaborator_id', 'collaborators.id')
            .innerJoin('teams', 'collaborators_teams.team_id', 'teams.id')
            .innerJoin('team_category', 'team_category.id', 'teams.category_id')
            .whereRaw(`team_category.user_id = ${ctx.user.id}`)
    },
    async collaborator(_, { filter }, ctx) {
        if (!filter) return null

        const { id } = filter
        if (id) {
            return db('collaborators')
                .innerJoin('collaborators_teams', 'collaborators_teams.collaborator_id', 'collaborators.id')
                .innerJoin('teams', 'collaborators_teams.team_id', 'teams.id')
                .innerJoin('team_category', 'team_category.id', 'teams.category_id')
                .whereRaw(`collaborators.id = ${id} AND team_category.user_id = ${ctx.user.id}`)
                .first()
        } else {
            return null
        }
    }
}