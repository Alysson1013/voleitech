const db = require('../../../config/db')
const { address: getAddress } = require('../Query/address')

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
    },
    async editAddress(_, { filter, data }, ctx) {
        ctx && ctx.userValidate()
        try {
            const addressData = await getAddress(_, { filter }, ctx)
            const id = addressData[0].id
            ctx && ctx.userValidatePropriety(addressData[0].user_id)

            await db('adresses')
                .where({ id })
                .update(data)

            return !addressData ? null : { ...addressData[0], ...data }
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = mutations