const db = require("../../../config/db")

module.exports = {
    async users (_, args){
        return db('users')
    }
}