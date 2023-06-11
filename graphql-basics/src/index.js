import { GraphQLServer } from 'graphql-yoga'
const chalk = require('chalk')
import db from './db'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutations'

const resolvers = {
User,
Post,
Comment,
Query,
Mutation
}
  
const server = new GraphQLServer ({
    typeDefs : './src/schema.graphql',
    resolvers,
    context : {
      db  : db
    }
})

server.start(() => {
    console.log(chalk.blue.inverse('The server is up'))
})