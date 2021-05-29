const db = require('../../../config/db')

module.exports = {
    async scouts(_, args, ctx) {
        return db
            .select(['scouts.id as id', 'scouts.name as name', 'v_floating_serve', 'v_floating_serve_points', 'v_floating_serve_mistake', 'v_trip_serve', 'v_trip_serve_points', 'v_trip_serve_mistake', 'v_attack', 'v_attack_points', 'v_attack_mistake', 'v_dripping_point', 'v_box_point', 'v_block', 'v_block_mistake', 'v_block_used_mistake', 'v_block_points', 'v_general_passes', 'v_pass_mistake', 'v_pass_a', 'v_pass_b', 'v_pass_c', 'v_defense_general', 'v_defense_mistake', 'v_defense_a', 'v_defense_b', 'v_defense_c', 'v_lifting', 'v_lifting_mistake', 'v_lifting_correct', 'v_initiative', 'v_initiative_lack', 'team_category.user_id'])
            .distinct('scouts.id')
            .orderBy('scouts.id', 'asc')
            .table('scouts')
            .leftJoin('training', 'training.scout_id', 'scouts.id')
            .rightJoin('teams', 'teams.id', 'training.team_id')
            .leftJoin('team_category', 'team_category.id', 'teams.category_id')
            .whereRaw(`team_category.user_id = ${ctx.user.id}`)
    },
    async scout(_, { filter }, ctx) {
        if (!filter) return null

        const { id, name } = filter

        if (id) {
            return db
                .select(['scouts.id as id', 'scouts.name as name', 'v_floating_serve', 'v_floating_serve_points', 'v_floating_serve_mistake', 'v_trip_serve', 'v_trip_serve_points', 'v_trip_serve_mistake', 'v_attack', 'v_attack_points', 'v_attack_mistake', 'v_dripping_point', 'v_box_point', 'v_block', 'v_block_mistake', 'v_block_used_mistake', 'v_block_points', 'v_general_passes', 'v_pass_mistake', 'v_pass_a', 'v_pass_b', 'v_pass_c', 'v_defense_general', 'v_defense_mistake', 'v_defense_a', 'v_defense_b', 'v_defense_c', 'v_lifting', 'v_lifting_mistake', 'v_lifting_correct', 'v_initiative', 'v_initiative_lack', 'team_category.user_id'])
                .table('scouts')
                .leftJoin('training', 'training.scout_id', 'scouts.id')
                .rightJoin('teams', 'teams.id', 'training.team_id')
                .leftJoin('team_category', 'team_category.id', 'teams.category_id')
                .whereRaw(`scouts.id = ${id} AND team_category.user_id = ${ctx.user.id}`)
                .first()
        } else if (name) {
            return db
                .select(['scouts.id as id', 'scouts.name as name', 'v_floating_serve', 'v_floating_serve_points', 'v_floating_serve_mistake', 'v_trip_serve', 'v_trip_serve_points', 'v_trip_serve_mistake', 'v_attack', 'v_attack_points', 'v_attack_mistake', 'v_dripping_point', 'v_box_point', 'v_block', 'v_block_mistake', 'v_block_used_mistake', 'v_block_points', 'v_general_passes', 'v_pass_mistake', 'v_pass_a', 'v_pass_b', 'v_pass_c', 'v_defense_general', 'v_defense_mistake', 'v_defense_a', 'v_defense_b', 'v_defense_c', 'v_lifting', 'v_lifting_mistake', 'v_lifting_correct', 'v_initiative', 'v_initiative_lack', 'team_category.user_id'])
                .table('scouts')
                .leftJoin('training', 'training.scout_id', 'scouts.id')
                .rightJoin('teams', 'teams.id', 'training.team_id')
                .leftJoin('team_category', 'team_category.id', 'teams.category_id')
                .whereRaw(`scouts.name = '${name}' AND team_category.user_id = ${ctx.user.id}`)
                .first()
        } else {
            return null
        }
    }
}