const db = require('../../../config/db')

module.exports = {
    async categories(_, args, ctx) {
        return db('team_category')
            .whereRaw(`team_category.user_id = ${ctx.user.id}`)
    },
    async category(_, { filter }) {
        if (!filter) return null

        const { id, name_category, user_id } = filter

        if (id) {
            return db('team_category')
                .whereRaw(`team_category.user_id = ${ctx.user.id}`)
        } else if (name_category) {
            return db('team_category')
                .whereRaw(`team_category.user_id = ${ctx.user.id}`)
        } else if (user_id) {
            return db('team_category')
                .whereRaw(`team_category.user_id = ${ctx.user.id}`)
        } else {
            return null
        }
    }
}