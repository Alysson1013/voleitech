const user = require('./user')
const collaborator = require('./collaborator')
const address = require('./address')
const category = require('./category')
const team = require('./team')
const collaborators_teams = require('./collaborator_team')

module.exports = {
    ...address,
    ...collaborator,
    ...category,
    ...team,
    ...collaborators_teams,
    ...user
}