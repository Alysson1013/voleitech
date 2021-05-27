const db = require('../../../config/db')
const { collaborator: getCollaborator } = require('../Query/collaborator')
const { training: getTraining } = require('../Query/training')
const { result: getResult } = require('../Query/result')

const mutations = {
    async newAthleteTrainingResult(_, { data }, ctx) {
        ctx && ctx.userValidate()
        try {
            const collaborator = await getCollaborator(_, {
                filter: data.collaborator
            })
            const training = await getTraining(_, {
                filter: data.training
            })
            const result = await getResult(_, {
                filter: data.result
            })
            data = {}
            data.collaborator_athlete_id = collaborator.id
            data.training_id = training.id
            data.result_id = result[0].id
            console.log(result)

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