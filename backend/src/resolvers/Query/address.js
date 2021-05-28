const db = require('../../../config/db')

module.exports = {
    async adresses(_, args, ctx) {
        return db('adresses')
            .select(['adresses.id', 'colab_id', 'main', 'cep', 'uf', 'district', 'road', 'number', 'complement', 'adresses.describe', 'adresses.created_at', 'user_id'])
            .table('adresses')
            .innerJoin('collaborators', 'collaborators.id', 'adresses.colab_id')
            .innerJoin('collaborators_teams', 'collaborators_teams.collaborator_id', 'collaborators.id')
            .innerJoin('teams', 'collaborators_teams.team_id', 'teams.id')
            .innerJoin('team_category', 'team_category.id', 'teams.category_id')
            .whereRaw(`team_category.user_id = ${ctx.user.id}`)
    },
    async address(_, { filter }) {
        if (!filter) return null

        const { colab_id } = filter

        if (colab_id) {
            return db('adresses')
                .where({ colab_id })
        } else {
            return null
        }
    }
}