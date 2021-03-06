const db = require('../../../config/db')
const { collaborator: getCollaborator } = require('../Query/collaborator')
const { training: getTraining } = require('../Query/training')
const { result: getResult } = require('../Query/result')

const mutations = {
    async newAthleteTrainingResult(_, { data }, ctx) {
        ctx && ctx.userValidate()
        try {
            const [id] = await db('athletes_training_results')
                .insert(data)
            return db('athletes_training_results')
                .where({ id })
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    }
}

module.exports = mutations