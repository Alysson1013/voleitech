const db = require('../../../config/db')

module.exports = {
    async trainings_types(_, args, ctx) {
        return db
            .select(['training_type.id as id', 'training_type_name', 'training_type.describe', 'team_category.user_id'])
            .table('training_type')
            .distinct('training_type.id')
            .innerJoin('training', 'training.training_type_id', 'training_type.id')
            .innerJoin('teams', 'teams.id', 'training.team_id')
            .leftJoin('team_category', 'team_category.id', 'teams.category_id')
            .whereRaw(`team_category.user_id = ${ctx.user.id}`)
    },
    async training_type(_, { filter }, ctx) {
        if (!filter) return null

        const { id, training_type_name } = filter

        if (id) {
            return db
                .select(['training_type.id as id', 'training_type_name', 'training_type.describe', 'team_category.user_id'])
                .table('training_type')
                .distinct('training_type.id')
                .innerJoin('training', 'training.training_type_id', 'training_type.id')
                .innerJoin('teams', 'teams.id', 'training.team_id')
                .leftJoin('team_category', 'team_category.id', 'teams.category_id')
                .whereRaw(`training_type.id = ${id} AND team_category.user_id = ${ctx.user.id}`)
                .first()
        } else if (training_type_name) {
            return db
                .select(['training_type.id as id', 'training_type_name', 'training_type.describe', 'team_category.user_id'])
                .table('training_type')
                .distinct('training_type.id')
                .innerJoin('training', 'training.training_type_id', 'training_type.id')
                .innerJoin('teams', 'teams.id', 'training.team_id')
                .leftJoin('team_category', 'team_category.id', 'teams.category_id')
                .whereRaw(`training_type.training_type_name = '${training_type_name}' AND team_category.user_id = ${ctx.user.id}`)
                .first()
        } else {
            return null
        }
    }
}