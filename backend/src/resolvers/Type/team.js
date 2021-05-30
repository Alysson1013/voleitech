const db = require('../../../config/db')

module.exports = {
    category(team) {
        return db
            .select(["name_category", "team_category.describe as describe"])
            .from("teams")
            .innerJoin("team_category", "teams.category_id", "team_category.id")
            .whereRaw(`teams.category_id = ${team.category_id}`)
            .first()
    },
    collaborators(team) {
        return db
            .select(['collaborators.id', 'collaborators.phone_1', 'collaborators.phone_2', 'collaborators.phone_3', 'collaborators.email_1', 'collaborators.email_2', 'collaborators.email_3', 'collaborators.name', 'collaborators.dt_birth', 'collaborators.function AS function', 'collaborators.n_enrollment_atl', 'collaborators.n_enrollment_ast', 'collaborators.positions', 'collaborators.n_uniform', 'collaborators.height', 'collaborators.weight', 'collaborators.width', 'collaborators.gender', 'collaborators.bmi', 'collaborators.jump_distance', 'collaborators.jump_height', 'collaborators.describe'])
            .table("collaborators")
            .innerJoin("collaborators_teams", "collaborators_teams.collaborator_id", "collaborators.id")
            .whereRaw(`collaborators_teams.team_id = ${team.id}`)
    }
}