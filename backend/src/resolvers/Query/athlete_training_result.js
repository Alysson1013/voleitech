const db = require('../../../config/db')

module.exports = {
    async athletes_trainings_results(_, args){
        return db('athletes_training_results')
    }
}