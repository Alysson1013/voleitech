const db = require('../../../config/db')

module.exports = {
    async trainings(_, { data }, ctx) {
        return db('training')
    }
}