require('dotenv').config()

const {ApolloServer, gql} = require('apollo-server')
const { importSchema } = require('graphql-import')

const resolvers = require('./src/resolvers/index.js')
const context = require('./src/context.js')

const schemaPath = './src/schema/index.graphql'
const server = new ApolloServer({
    typeDefs: importSchema(schemaPath),
    resolvers,
    context
})

server.listen().then(({ url }) => {
    console.log(`Server running in ${url}`)
}) 