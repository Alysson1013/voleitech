const db = require('../../../config/db')

const mutations = {
    async newCategory(_, { data }, ctx){
        try {
            ctx && ctx.userValidate()

            data.user_id = ctx.user.id
            const [id] = await db('team_category')
                .insert(data)
            return db('team_category')
                .where({id})
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    }
}

module.exports = mutations