const db = require('../../../config/db')

module.exports = {
    training(result) {
        return db
            .select(['training.id as id', 'training.name as name', 'dt_training', 'hour_start', 'hour_finish'])
            .table('athletes_training_results')
            .innerJoin('training', 'athletes_training_results.training_id', 'training.id')
            .whereRaw(`athletes_training_results.result_id = ${result.id}`)
            .first()
    },
    collaborator(result) {
        return db
            .select(['collaborators.id', 'collaborators.phone_1', 'collaborators.phone_2', 'collaborators.phone_3', 'collaborators.email_1', 'collaborators.email_2', 'collaborators.email_3', 'collaborators.name', 'collaborators.dt_birth', 'collaborators.function AS function', 'collaborators.n_enrollment_atl', 'collaborators.n_enrollment_ast', 'collaborators.positions', 'collaborators.n_uniform', 'collaborators.height', 'collaborators.weight', 'collaborators.width', 'collaborators.gender', 'collaborators.bmi', 'collaborators.jump_distance', 'collaborators.jump_height', 'collaborators.describe'])
            .table("collaborators")
            .innerJoin("athletes_training_results", "athletes_training_results.collaborator_athlete_id", "collaborators.id")
            .whereRaw(`athletes_training_results.result_id = ${result.id}`)
            .first()
    }
}