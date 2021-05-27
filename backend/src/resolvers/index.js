const Query = require('./Query')
const Mutation = require('./Mutation')
const Collaborator = require('./Type/collaborator')
const Address = require('./Type/address')
const Collaborator_Team = require('./Type/collaborator_team') 
const Team = require('./Type/team')
const Training = require('./Type/training') 
const Athlete_Training_Result = require('./Type/athlete_training_result')
const Result = require('./Type/result')

module.exports = {
    Address,
    Collaborator,
    Team,
    Collaborator_Team,
    Training,
    Athlete_Training_Result,
    Result,
    Query,
    Mutation
}