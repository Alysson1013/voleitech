const db = require('../../../config/db')

module.exports = {
    async collaborator(athlete_training_result) {
        return db('collaborators')
            .where({ id: athlete_training_result.collaborator_athlete_id })
            .first()
    },
    async training(athlete_training_result) {
        return db('training')
            .where({ id: athlete_training_result.training_id })
            .first()
    },
    async result(athlete_training_result) {
        return db('results')
            .where({ id: athlete_training_result.result_id })
            .first()
    }
}