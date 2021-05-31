const db = require('../../../config/db')
const { training_type: getTrainingType } = require('../Query/training_type')
const { team: getTeam } = require('../Query/team')
const { scout: getScout } = require('../Query/scout')
const { training: getTraining } = require('../Query/training')

const mutations = {
    async newTraining(_, { data }, ctx) {
        ctx && ctx.userValidate()
        try {
            if (data.training_type) {
                data.training_type_id = data.training_type.id
                delete data.training_type
            }

            if (data.team) {
                data.team_id = data.team.id
                delete data.team
            }

            if (data.scout) {
                data.scout_id = data.scout.id
                delete data.scout
            }

            console.log(data)

            const [id] = await db('training')
                .insert(data)
            return db('training')
                .where({ id })
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    },
    async editTraining(_, { filter, data }, ctx) {
        ctx && ctx.userValidate()
        try {
            const trainingData = await getTraining(_, { filter }, ctx)
            const id = trainingData.id

            if (data.training_type) {
                data.training_type_id = data.training_type.id
                delete data.training_type
            }

            if (data.team) {
                data.team_id = data.team.id
                delete data.team
            }

            if (data.scout) {
                data.scout_id = data.scout.id
                delete data.scout
            }

            await db('training')
                .where({ id })
                .update(data)

            return !trainingData ? null : { ...trainingData, ...data }
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = mutations