require('dotenv').config()

const { ApolloServer } = require('apollo-server')
const { importSchema } = require('graphql-import')

const resolvers = require('./src/resolvers/index.js')
const context = require('./src/context')

const schemaPath = './src/schema/index.graphql'
const server = new ApolloServer({
    cors: {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    },
    typeDefs: importSchema(schemaPath),
    resolvers,
    context,
})

server.listen().then(({ url }) => {
    console.log(`Server running in ${url}`)
}) 