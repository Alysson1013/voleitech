const db = require('../../../config/db')

module.exports = {
    training(result) {
        return db
            .select(['training.id as id', 'training.name as name', 'dt_training', 'hour_start', 'hour_finish'])
            .table('athletes_training_results')
            .innerJoin('training', 'athletes_training_results.training_id', 'training.id')
            .whereRaw(`athletes_training_results.result_id = ${result.id}`)
            .first()
    }
}