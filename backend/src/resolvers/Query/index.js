const user = require('./user')
const collaborator = require('./collaborator')
const address = require('./address')

module.exports = {
    ...address,
    ...collaborator,
    ...user
}