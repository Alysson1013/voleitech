const user = require('./user')
const collaborator = require('./collaborator')
const address = require('./address')
const category = require('./category')
const collaborator_team = require('./collaborator_team')
const team = require('./team')
const training_type = require('./training_type')

module.exports = {
    ...user,
    ...collaborator,
    ...address,
    ...category,
    ...team,
    ...training_type,
    ...collaborator_team
}