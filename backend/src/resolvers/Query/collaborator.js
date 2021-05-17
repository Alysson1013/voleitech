const db = require('../../../config/db')

module.exports = {
    async collaborators(_, args) {
        return db('collaborators')
    },
    async collaborator(_, { filter }) {
        if (!filter) return null

        const { id } = filter
        if (id) {
            return db('collaborators')
                .where({ id })
                .first()
        } else {
            return null
        }
    }
}