const user = require('./user')
const collaborator = require('./collaborator')

module.exports = {
    ...collaborator,
    ...user
}