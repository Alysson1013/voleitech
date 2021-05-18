const db = require('../../../config/db')

module.exports = {
    async adresses(_, args) {
        return db('adresses')
    },
    async address(_, { filter }) {
        if (!filter) return null

        const { colab_id } = filter

        if (colab_id){
            return db('adresses')
                .where({ colab_id })
        } else {
            return null
        }
    }
}