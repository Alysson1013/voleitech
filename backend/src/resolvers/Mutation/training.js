const db = require('../../../config/db')
const { training_type: getTrainingType } = require('../Query/training_type')
const { team: getTeam } = require('../Query/team')
const { scout: getScout } = require('../Query/scout')

const mutations = {
    async newTraining(_, { data }, ctx) {
        ctx && ctx.userValidate()
        try {
            const training_type = await getTrainingType(_, {
                filter: data.training_type
            })
            const team = await getTeam(_, {
                filter: data.team
            })
            const scout = await getScout(_, {
                filter: data.scout
            })

            delete data.training_type
            delete data.team
            delete data.scout

            data.training_type_id = training_type.id
            data.team_id = team.id
            data.scout_id = scout.id

            console.log(data)

            const [id] = await db('training')
                .insert(data)
            return db('training')
                .where({ id })
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    }
}

module.exports = mutations