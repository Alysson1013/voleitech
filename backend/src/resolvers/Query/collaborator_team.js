const db = require('../../../config/db')

module.exports = {
    async collaborators_teams(_, args, ctx) {
        return db
            .select(['collaborators_teams.id', 'collaborators_teams.collaborator_id', 'collaborators_teams.team_id', 'collaborators_teams.function', 'collaborators_teams.status', 'user_id'])
            .distinct('collaborators_teams.id')
            .orderBy('collaborators_teams.id', 'asc')
            .table('collaborators_teams')
            .innerJoin('collaborators', 'collaborators.id', 'collaborators_teams.collaborator_id')
            .innerJoin('teams', 'collaborators_teams.team_id', 'teams.id')
            .innerJoin('team_category', 'team_category.id', 'teams.category_id')
            .whereRaw(`team_category.user_id = ${ctx.user.id}`)
    },
    async collaborator_team(_, { filter }, ctx) {
        if (!filter) return null

        const { id } = filter
        if (id) {
            return db('collaborators_teams')
                .select(['collaborators_teams.id', 'collaborators_teams.collaborator_id', 'collaborators_teams.team_id', 'collaborators_teams.function', 'collaborators_teams.status', 'user_id'])
                .distinct('collaborators_teams.id')
                .orderBy('collaborators_teams.id', 'asc')
                .table('collaborators_teams')
                .innerJoin('collaborators', 'collaborators.id', 'collaborators_teams.collaborator_id')
                .innerJoin('teams', 'collaborators_teams.team_id', 'teams.id')
                .innerJoin('team_category', 'team_category.id', 'teams.category_id')
                .whereRaw(`collaborators_teams.id = ${id} AND team_category.user_id = ${ctx.user.id}`)
                .first()
        } else {
            return null
        }
    }
}