import { GraphQLServer } from 'graphql-yoga'
const chalk = require('chalk')


const typeDefs = `
type Query {
    price: Float!
    title: String!
    RealeaseYear: Int!
    inStock: Boolean!
    Rating: Float
}
`

const resolvers = {
    Query: {
      price() {
        return 49.99
      },
      title() {
        return 'Video Game'
      },
      RealeaseYear() {
        return 2023
      },
      inStock() {
        return false
      },
      Rating () {
       return 5.0
            
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