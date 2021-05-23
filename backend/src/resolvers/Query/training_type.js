const db = require('../../../config/db')

module.exports = {
    async trainings_types(_, args) {
        return db('training_type')
    },
    async training_type(_, { filter }) {
        if (!filter) return null

        const { id, training_type_name } = filter

        if (id) {
            return db('training_type')
                .where({ id })
                .first()
        } else if (training_type_name) {
            return db('training_type')
                .where({ training_type_name })
                .first()
        } else {
            return null
        }
    }
}