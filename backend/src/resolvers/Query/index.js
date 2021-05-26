const user = require('./user')
const collaborator = require('./collaborator')
const address = require('./address')
const category = require('./category')
const team = require('./team')
const collaborators_teams = require('./collaborator_team')
const training_type = require('./training_type')
const scout = require('./scout')
const training = require('./training')
const result = require('./result')
const athletes_training_results = require('./athlete_training_result')

module.exports = {
    ...address,
    ...collaborator,
    ...category,
    ...team,
    ...collaborators_teams,
    ...training_type,
    ...scout,
    ...training,
    ...result,
    ...athletes_training_results,
    ...user
}