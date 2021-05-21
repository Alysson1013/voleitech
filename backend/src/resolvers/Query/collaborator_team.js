const db = require('../../../config/db')

module.exports = {
    async collaborators_teams(_, args){
        return db
            .select('id', 'function', 'status')
            .table('collaborators_teams')
    }
}