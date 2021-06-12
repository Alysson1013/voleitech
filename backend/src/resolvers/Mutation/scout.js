const db = require('../../../config/db')
const { scout: getScout } = require('../Query/scout')

const mutations = {
    async newScout(_, { data }, ctx) {
        ctx && ctx.userValidate()
        try {
            const [id] = await db('scouts')
                .insert(data)
            return db('scouts')
                .where({ id })
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    },
    async editScout(_, { data, filter }, ctx) {
        ctx && ctx.userValidate()
        try {
            const scoutData = await getScout(_, { filter }, ctx)
            const id = scoutData.id

            await db('scouts')
                .where({ id })
                .update(data)

            return !scoutData ? null : { ...scoutData, ...data }
        } catch (error) {
            throw new Error(error)
        }
    },
}

module.exports = mutations