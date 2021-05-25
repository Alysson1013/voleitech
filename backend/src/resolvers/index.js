const Query = require('./Query')
const Mutation = require('./Mutation')
const Collaborator = require('./Type/collaborator')
const Address = require('./Type/address')
const Collaborator_Team = require('./Type/collaborator_team') 
const Team = require('./Type/team')
const Training = require('./Type/training') 

module.exports = {
    Address,
    Collaborator,
    Team,
    Collaborator_Team,
    Training,
    Query,
    Mutation
}