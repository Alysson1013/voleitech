const db = require('../../../config/db')

module.exports = {
    async trainings(_, { data }, ctx) {
        return db
            .select(['training.id', 'training.training_type_id', 'training.team_id', 'training.scout_id', 'training.name', 'training.dt_training', 'training.hour_start', 'training.hour_finish', 'training.created_at', 'team_category.user_id'])
            .table('training')
            .distinct('training.dt_training')
            .orderBy('training.dt_training', 'asc')
            .innerJoin('teams', 'teams.id', 'training.team_id')
            .innerJoin('team_category', 'team_category.id', 'teams.category_id')
            .whereRaw(`team_category.user_id = ${ctx.user.id}`)
    },
    async training(_, { filter }, ctx) {
        if (!filter) return null

        const { id } = filter
        if (id) {
            return db
                .select(['training.id', 'training.training_type_id', 'training.team_id', 'training.scout_id', 'training.name', 'training.dt_training', 'training.hour_start', 'training.hour_finish', 'training.created_at', 'team_category.user_id'])
                .table('training')
                .distinct('training.dt_training')
                .orderBy('training.dt_training', 'asc')
                .innerJoin('teams', 'teams.id', 'training.team_id')
                .innerJoin('team_category', 'team_category.id', 'teams.category_id')
                .whereRaw(`training.id = ${id} AND team_category.user_id = ${ctx.user.id}`)
                .first()
        } else {
            return null
        }
    },
    async resultsMouthYear(_, { filter }, ctx) {
        if (!filter) return null

        const { month, year } = filter
        if (month) {
            return db
                .select(['training.id', 'training.training_type_id', 'training.team_id', 'training.scout_id', 'training.name', 'training.dt_training', 'training.hour_start', 'training.hour_finish', 'training.created_at', 'team_category.user_id'])
                .table('training')
                .distinct('training.dt_training')
                .orderBy('training.dt_training', 'asc')
                .innerJoin('teams', 'teams.id', 'training.team_id')
                .innerJoin('team_category', 'team_category.id', 'teams.category_id')
                .whereRaw(`MONTH(training.dt_training) = ${month} AND team_category.user_id = ${ctx.user.id}`)
        } else if (year) {
            return db('results')
                .select(['training.id', 'training.training_type_id', 'training.team_id', 'training.scout_id', 'training.name', 'training.dt_training', 'training.hour_start', 'training.hour_finish', 'training.created_at', 'team_category.user_id'])
                .table('training')
                .distinct('training.dt_training')
                .orderBy('training.dt_training', 'asc')
                .innerJoin('teams', 'teams.id', 'training.team_id')
                .innerJoin('team_category', 'team_category.id', 'teams.category_id')
                .whereRaw(`YEAR(training.dt_training) = ${year} AND team_category.user_id = ${ctx.user.id}`)
        } else {
            return null
        }
    }
}