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
    async address(_, { filter }, ctx) {
        if (!filter) return null

        const { colab_id, id } = filter

        if (colab_id) {
            return db('adresses')
                .select(['adresses.id', 'colab_id', 'main', 'cep', 'uf', 'district', 'road', 'number', 'complement', 'adresses.describe', 'adresses.created_at', 'user_id'])
                .table('adresses')
                .innerJoin('collaborators', 'collaborators.id', 'adresses.colab_id')
                .innerJoin('collaborators_teams', 'collaborators_teams.collaborator_id', 'collaborators.id')
                .innerJoin('teams', 'collaborators_teams.team_id', 'teams.id')
                .innerJoin('team_category', 'team_category.id', 'teams.category_id')
                .whereRaw(`colab_id=${colab_id} AND team_category.user_id = ${ctx.user.id}`)
        } else if (id) {
            return db('adresses')
                .select(['adresses.id', 'colab_id', 'main', 'cep', 'uf', 'district', 'road', 'number', 'complement', 'adresses.describe', 'adresses.created_at', 'user_id'])
                .table('adresses')
                .innerJoin('collaborators', 'collaborators.id', 'adresses.colab_id')
                .innerJoin('collaborators_teams', 'collaborators_teams.collaborator_id', 'collaborators.id')
                .innerJoin('teams', 'collaborators_teams.team_id', 'teams.id')
                .innerJoin('team_category', 'team_category.id', 'teams.category_id')
                .whereRaw(`adresses.id=${id} AND team_category.user_id = ${ctx.user.id}`)
        } else {
            return null
        }
    }
}