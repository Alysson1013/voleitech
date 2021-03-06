const user = require('./user')
const collaborator = require('./collaborator')
const address = require('./address')
const category = require('./category')
const collaborator_team = require('./collaborator_team')
const team = require('./team')
const training_type = require('./training_type')
const scout = require('./scout')
const training = require('./training')
const result = require('./result')
const athlete_training_result = require('./athlete_training_result')

module.exports = {
    ...user,
    ...collaborator,
    ...address,
    ...category,
    ...team,
    ...training_type,
    ...scout,
    ...collaborator_team,
    ...training,
    ...result,
    ...athlete_training_result
}