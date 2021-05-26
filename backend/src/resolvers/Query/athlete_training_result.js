const db = require('../../../config/db')

module.exports = {
    async athletes_trainings_results(_, args) {
        return db('athletes_training_results')
    },
    async athlete_training_result(_, { filter }) {
        if (!filter) return null

        const { id } = filter

        if (id) {
            return db('athletes_training_results')
                .where({ id })
                .first()
        } else {
            return null
        }
    }
}