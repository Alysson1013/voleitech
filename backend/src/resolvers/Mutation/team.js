const db = require('../../../config/db')
const { team: getTeam } = require('../Query/team')

const mutations = {
    async newTeam(_, { data }, ctx) {
        ctx && ctx.userValidate()
        try {
            const [id] = await db('teams')
                .insert(data)
            return db('teams')
                .where({ id })
                .first()
        } catch (error) {
            throw new Error(error.sqlMessage)
        }
    },
    async editTeam(_, { data, filter }, ctx) {
        ctx && ctx.userValidate()
        try {
            const teamData = await getTeam(_, { filter }, ctx)
            const id = teamData.id

            console.log(teamData)
            console.log(data)

            await db('teams')
                .where({ id })
                .update(data)

            return !teamData ? null : { ...teamData, ...data }
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = mutations