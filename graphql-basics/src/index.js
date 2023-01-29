import { GraphQLServer } from 'graphql-yoga'
const chalk = require('chalk')


const typeDefs = `
    type Query {
    hello: String!
    }
`

const resolvers = {
    Query: {
        hello() {
            return 'This is my first query'
        }
    }
}

const server = new GraphQLServer ({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log(chalk.blue.inverse('The server is up'))
})