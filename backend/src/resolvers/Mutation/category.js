const db = require('../../../config/db')
const { category: getCategory } = require('../Query/category')

const mutations = {
    async newCategory(_, { data }, ctx) {
        ctx && ctx.userValidate()
        try {
            data.user_id = ctx.user.id
            const [id] = await db('team_category')
                .insert(data)
            return db('team_category')
                .where({ id })
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    },
    async editCategory(_, { filter, data }, ctx) {
        ctx && ctx.userValidate()
        try {
            const categoryData = await getCategory(_, { filter }, ctx)
            const id = categoryData[0].id

            await db('team_category')
                .where({ id })
                .update(data)

            return !categoryData ? null : { ...categoryData[0], ...data }
        } catch (error) {
            throw new Error(error)
        }
    },
    async deleteCategory(_, { filter }, ctx) {
        ctx && ctx.userValidate()
        try {
            const categoryData = await getCategory(_, { filter }, ctx)
            const id = categoryData[0].id

            await db('team_category')
                .delete()
                .whereRaw(`teams.id = ${id}`)
            
            return categoryData[0]
        } catch (error) {
            throw new Error("This category is still being used")
        }
    }
}

module.exports = mutations