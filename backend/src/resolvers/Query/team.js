const db = require('../../../config/db')

module.exports = {
    async teams(_, args, ctx) {
        return db
            .select(["teams.id as id", "teams.name as name", "team_category.id as category_id", "team_category.name_category as category", "average_result", "average_age", "average_height", "average_weight", "teams.describe as describe", "user_id", "gender"])
            .table("teams")
            .distinct('teams.id')
            .orderBy('teams.id', 'asc')
            .innerJoin("team_category", "teams.category_id", "team_category.id")
            .whereRaw(`user_id = ${ctx.user.id}`)
    },
    async team(_, { filter }, ctx) {
        if (!filter) return null

        const { id } = filter

        if (id) {
            return db
                .select(["teams.id as id", "teams.name as name", "team_category.name_category as category", "team_category.id as category_id", "average_result", "average_age", "average_height", "average_weight", "teams.describe as describe", "user_id", "gender"])
                .table("teams")
                .distinct('teams.id')
                .orderBy('teams.id', 'asc')
                .innerJoin("team_category", "teams.category_id", "team_category.id")
                .whereRaw(`teams.id = ${id} AND user_id = ${ctx.user.id}`)
                .first()
        } else {
            return null
        }
    }
}