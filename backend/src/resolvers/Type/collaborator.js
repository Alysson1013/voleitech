const db = require('../../../config/db')

module.exports = {
    user(collaborator) {
        return db('users')
            .where({ id: collaborator.user_id })
            .first()
    },
    adresses(collaborator) {
        return db('adresses')
            .where({ colab_id: collaborator.id })
    },
    teams(collaborator) {
        return db
            .select("teams.id as id", "collaborators_teams.function as assignment", "teams.gender", "team_category.user_id", "teams.name", "teams.average_result", "teams.average_age", "teams.average_height", "teams.average_weight", "teams.describe", "collaborators_teams.status", "teams.category_id as category_id")
            .table("collaborators_teams")
            .innerJoin("collaborators", "collaborators_teams.collaborator_id", "collaborators.id")
            .innerJoin("teams", "collaborators_teams.team_id", "teams.id")
            .innerJoin("team_category", "teams.category_id", "team_category.id")
            .whereRaw(`collaborators_teams.collaborator_id  = ${collaborator.id}`)
    }
}