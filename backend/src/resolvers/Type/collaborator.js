const db = require('../../../config/db')

module.exports = {
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
    },
    results(collaborator) {
        return db
            .select(['results.id as id', 'dt_result', 'general_points','n_floating_serve', 'n_floating_serve_points', 'n_floating_serve_mistake', 'n_trip_serve', 'n_trip_serve_points', 'n_trip_serve_mistake', 'n_attack', 'n_attack_points', 'n_attack_mistake', 'n_dripping_point', 'n_box_point', 'n_block', 'n_block_mistake', 'n_block_used_mistake', 'n_block_points', 'n_general_passes', 'n_pass_mistake', 'n_pass_a', 'n_pass_b', 'n_pass_c', 'n_defense_general', 'n_defense_mistake', 'n_defense_a', 'n_defense_b', 'n_defense_c', 'n_lifting', 'n_lifting_mistake', 'n_lifting_correct', 'n_initiative', 'n_initiative_lack'])
            .table("athletes_training_results") 
            .innerJoin('collaborators', 'collaborators.id', 'athletes_training_results.collaborator_athlete_id')
            .innerJoin('results', 'results.id', 'athletes_training_results.result_id')
            .whereRaw(`athletes_training_results.collaborator_athlete_id = ${collaborator.id}`)
    }
}