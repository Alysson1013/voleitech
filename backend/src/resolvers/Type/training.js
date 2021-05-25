const db = require('../../../config/db')

module.exports = {
    async training_type(training) {
        return db
            .select(['training_type.id as id', 'training_type_name', 'describe'])
            .from('training')
            .innerJoin('training_type', 'training_type.id', 'training.training_type_id')
            .whereRaw(`training.id = ${training.id}`)
            .first()
    },
    async team(training) {
        return db
            .select("teams.id as id", "teams.gender", "teams.name", "teams.average_result", "teams.average_age", "teams.average_height", "teams.average_weight", "teams.describe", "teams.category_id as category_id")
            .from('training')
            .innerJoin("teams", "teams.id", "training.team_id")
            .whereRaw(`training.id  = ${training.id}`)
            .first()
    },
    async scout(training) {
        return db
            .select(['scouts.id as id', 'scouts.name as name', 'v_floating_serve', 'v_floating_serve_points', 'v_floating_serve_mistake', 'v_trip_serve', 'v_trip_serve_points', 'v_trip_serve_mistake', 'v_attack', 'v_attack_points', 'v_attack_mistake', 'v_dripping_point', 'v_box_point', 'v_block', 'v_block_mistake', 'v_block_used_mistake', 'v_block_points', 'v_general_passes', 'v_pass_mistake', 'v_pass_a', 'v_pass_b', 'v_pass_c', 'v_defense_general', 'v_defense_mistake', 'v_defense_a', 'v_defense_b', 'v_defense_c', 'v_lifting', 'v_lifting_mistake', 'v_lifting_correct', 'v_initiative', 'v_initiative_lack'])
            .from('training')
            .innerJoin("scouts", "training.scout_id", "scouts.id")
            .whereRaw(`training.id  = ${training.id}`)
            .first()
    }
}