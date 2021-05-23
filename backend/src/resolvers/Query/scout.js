const db = require('../../../config/db')

module.exports = {
    async scouts(_, args) {
        return db('scouts')
    },
    async scout(_, { filter }) {
        if (!filter) return null

        const { id, name } = filter

        if (id) {
            return db('scouts')
                .where({ id })
                .first()
        } else if (name) {
            return db('scouts')
                .where({ name })
                .first()
        } else {
            return null
        }
    }
}