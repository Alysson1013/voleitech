const Query = require('./Query')
const Mutation = require('./Mutation')
const Collaborator = require('./Type/collaborator')
const Address = require('./Type/address')
const Team = require('./Type/team')

module.exports = {
    Address,
    Collaborator,
    Team,
    Query,
    Mutation
}