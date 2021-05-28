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
    },
    async resultsMouthYear(_, { filter }) {
        if (!filter) return null

        const { month, year } = filter
        if (month) {
            return db('results')
                .whereRaw(`MONTH(dt_result) = ${month}`)
        } else if (year) {
            return db('results')
                .whereRaw(`YEAR(dt_result) = ${year}`)
        } else {
            return null
        }
    }
}