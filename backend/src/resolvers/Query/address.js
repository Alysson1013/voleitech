const db = require('../../../config/db')

module.exports = {
    async address(_, args){
        return db('adresses')
    }
}