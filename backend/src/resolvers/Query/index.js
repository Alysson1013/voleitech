const user = require('./user')
const collaborator = require('./collaborator')
const address = require('./address')
const category = require('./category')
const team = require('./team')
const collaborators_teams = require('./collaborator_team')
const training_type = require('./training_type')

module.exports = {
    ...address,
    ...collaborator,
    ...category,
    ...team,
    ...collaborators_teams,
    ...training_type,
    ...user
}