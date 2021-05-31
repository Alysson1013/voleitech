const db = require('../../../config/db')
const { training_type: getTraining_type } = require('../Query/training_type')  

const mutations = {
    async newTrainingType(_, { data }, ctx) {
        ctx && ctx.userValidate()
        try {
            const [id] = await db('training_type')
                .insert(data)
            return db('training_type')
                .where({ id })
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    },
    async editTrainingType(_, { data, filter }, ctx) {
        ctx && ctx.userValidate()
        try {
            const training_typeData = await getTraining_type(_, { filter }, ctx)
            const id = training_typeData.id

            await db('training_type')
                .where({ id })
                .update(data)

            return !training_typeData ? null : { ...training_typeData, ...data }
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = mutations