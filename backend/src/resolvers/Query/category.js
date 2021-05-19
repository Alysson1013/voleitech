const db = require('../../../config/db')

module.exports = {
    async categories(_, args){
        return db('team_category')
    },
    async category(_, { filter }){
        if (!filter) return null

        const { id, name_category, user_id } = filter

        if (id){
            return db('team_category')
                .where({ id })
        } else if (name_category) {
            return db('team_category')
                .where({ name_category })
        } else if (user_id) {
            return db('team_category')
                .where({ user_id })
        } else {
            return null
        }
    }
}