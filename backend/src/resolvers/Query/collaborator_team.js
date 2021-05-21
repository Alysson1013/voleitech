const db = require('../../../config/db')

module.exports = {
    async collaborators_teams(_, args) {
        return db
            .select()
            .table('collaborators_teams')
    },
    async collaborator_team(_, { filter }) {
        if (!filter) return null

        const { id } = filter
        if (id) {
            return db('collaborators_teams')
                .where({ id })
                .first()
        } else {
            return null
        }
    }
}