const db = require('../../../config/db')

module.exports = {
    async categories(_, args){
        return db('team_category')
    }
}