const db = require('../../../config/db')

const mutations = {
    async newAddress(_, { data }) {
        ctx && ctx.userValidate()
        try {
            const [id] = await db('adresses')
                .insert(data)
            return db('adresses')
                .where({ id })
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    }
}

module.exports = mutations