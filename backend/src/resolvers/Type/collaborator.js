const db = require('../../../config/db')

module.exports = {
    user(collaborator) {
        return db('users')
            .where({ id: collaborator.user_id })
            .first()
    },
    adresses(collaborator) {
        return db('adresses')
            .where({ colab_id: collaborator.id })
    }
}