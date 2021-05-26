const db = require('../../../config/db')

module.exports = {
    async results(_, args) {
        return db('results')
    },
    async result(_, { filter }) {
        if (!filter) return null

        const { id, dt_result } = filter

        if (id) {
            return db('results')
                .where({ id })
        } else if (dt_result) {
            return db('results')
                .where({ dt_result })
        }
    }
}