const db = require('../../../config/db')

module.exports = {
    async trainings(_, { data }, ctx) {
        return db('training')
    },
    async training(_, { filter }) {
        if (!filter) return null

        const { id } = filter
        if (id) {
            return db('training')
                .where({ id })
                .first()
        } else {
            return null
        }
    }
}