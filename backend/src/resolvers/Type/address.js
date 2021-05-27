const db = require('../../../config/db')

module.exports = {
    async colab(address){
        return db('collaborators')
            .where({id: address.colab_id})
            .first()
    }
}