const db = require('../../../config/db')

module.exports = {
    async categories(_, args, ctx) {
        return db('team_category')
            .whereRaw(`team_category.user_id = ${ctx.user.id}`)
    },
    async category(_, { filter }, ctx) {
        if (!filter) return null

        const { id } = filter

        if (id) {
            return db('team_category')
                .whereRaw(`team_category.id = ${id} AND team_category.user_id = ${ctx.user.id}`)
        } else {
            return null
        }
    }
}