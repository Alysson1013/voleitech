const db = require('../../../config/db')

module.exports = {
    async collaborator(collaborators_teams) {
        return db
            .select(['collaborators.id', 'collaborators.phone_1', 'collaborators.phone_2', 'collaborators.phone_3', 'collaborators.email_1', 'collaborators.email_2', 'collaborators.email_3', 'collaborators.name', 'collaborators.dt_birth', 'collaborators.function AS function', 'collaborators.n_enrollment_atl', 'collaborators.n_enrollment_ast', 'collaborators.positions', 'collaborators.n_uniform', 'collaborators.height', 'collaborators.weight', 'collaborators.width', 'collaborators.gender', 'collaborators.bmi', 'collaborators.jump_distance', 'collaborators.jump_height', 'collaborators.describe'])
            .table("collaborators_teams")
            .innerJoin("collaborators", "collaborators_teams.collaborator_id", "collaborators.id")
            .whereRaw(`collaborators.id = ${collaborators_teams.collaborator_id}`)
            .first()
    },
    async team(collaborators_teams){
        return db
        .select(['teams.id', 'teams.category_id', 'teams.gender', 'teams.name', 'teams.average_result', 'teams.average_age', 'teams.average_height', 'teams.average_weight', 'teams.describe', 'teams.created_at'])
        .table("collaborators_teams")
        .innerJoin("teams", "collaborators_teams.team_id", "teams.id")
        .whereRaw(`teams.id = ${collaborators_teams.team_id}`)
        .first()
    }
}