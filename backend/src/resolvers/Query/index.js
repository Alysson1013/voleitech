const user = require('./user')
const collaborator = require('./collaborator')
const address = require('./address')
const category = require('./category')
const team = require('./team')

module.exports = {
    ...address,
    ...collaborator,
    ...category,
    ...team,
    ...user
}