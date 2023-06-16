import { GraphQLServer, PubSub } from 'graphql-yoga'
const chalk = require('chalk')
import db from './db'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutations'
import Subscription from './resolvers/Subscriptions'

const pubsub = new PubSub()

const resolvers = {
User,
Post,
Comment,
Query,
Mutation,
Subscription
}
  
const server = new GraphQLServer ({
    typeDefs : './src/schema.graphql',
    resolvers,
    context : {
      db  : db,
      pubsub
    }
})

server.start(() => {
    console.log(chalk.blue.inverse('The server is up'))
})