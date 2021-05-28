const db = require('../../../config/db')

module.exports = {
    async results(_, args, ctx) {
        return db
            .select(['results.id as id', 'dt_result', 'general_points', 'n_floating_serve', 'n_floating_serve_points', 'n_floating_serve_mistake', 'n_trip_serve', 'n_trip_serve_points', 'n_trip_serve_mistake', 'n_attack', 'n_attack_points', 'n_attack_mistake', 'n_dripping_point', 'n_box_point', 'n_block', 'n_block_mistake', 'n_block_used_mistake', 'n_block_points', 'n_general_passes', 'n_pass_mistake', 'n_pass_a', 'n_pass_b', 'n_pass_c', 'n_defense_general', 'n_defense_mistake', 'n_defense_a', 'n_defense_b', 'n_defense_c', 'n_lifting', 'n_lifting_mistake', 'n_lifting_correct', 'n_initiative', 'n_initiative_lack', 'user_id'])
            .table('results')
            .innerJoin('athletes_training_results', 'athletes_training_results.result_id', 'results.id')
            .innerJoin('collaborators', 'collaborators.id', 'athletes_training_results.collaborator_athlete_id')
            .innerJoin('collaborators_teams', 'collaborators_teams.collaborator_id', 'collaborators.id')
            .innerJoin('teams', 'collaborators_teams.team_id', 'teams.id')
            .innerJoin('team_category', 'team_category.id', 'teams.category_id')
            .whereRaw(`team_category.user_id = ${ctx.user.id}`)
    },
    async result(_, { filter }, ctx) {
        if (!filter) return null

        const { id, dt_result } = filter

        if (id) {
            return db
                .select(['results.id as id', 'dt_result', 'general_points', 'n_floating_serve', 'n_floating_serve_points', 'n_floating_serve_mistake', 'n_trip_serve', 'n_trip_serve_points', 'n_trip_serve_mistake', 'n_attack', 'n_attack_points', 'n_attack_mistake', 'n_dripping_point', 'n_box_point', 'n_block', 'n_block_mistake', 'n_block_used_mistake', 'n_block_points', 'n_general_passes', 'n_pass_mistake', 'n_pass_a', 'n_pass_b', 'n_pass_c', 'n_defense_general', 'n_defense_mistake', 'n_defense_a', 'n_defense_b', 'n_defense_c', 'n_lifting', 'n_lifting_mistake', 'n_lifting_correct', 'n_initiative', 'n_initiative_lack', 'user_id'])
                .table('results')
                .innerJoin('athletes_training_results', 'athletes_training_results.result_id', 'results.id')
                .innerJoin('collaborators', 'collaborators.id', 'athletes_training_results.collaborator_athlete_id')
                .innerJoin('collaborators_teams', 'collaborators_teams.collaborator_id', 'collaborators.id')
                .innerJoin('teams', 'collaborators_teams.team_id', 'teams.id')
                .innerJoin('team_category', 'team_category.id', 'teams.category_id')
                .innerJoin('training')
                .whereRaw(`results.id = ${id} AND team_category.user_id = ${ctx.user.id}`)
                .limit(1)
        } else if (dt_result) {
            return db

        }
    }
}