import { GraphQLServer } from 'graphql-yoga'
const chalk = require('chalk')


const typeDefs = `
type Query {
  greeting(name: String) : String,
  add(a: Float, b: Float) : Float 
  me : User!
  post : Post!
}


type User {
  ID : ID!
  Nachname : String!
  Vorname : String!
  age: Int!
},

type Post {
  ID : ID!
  title : String!
  body :  String!
  published : Boolean!

}
`

const resolvers = {
    Query: {
    me() {
      return {
        ID : 21312312,
        Nachname : 'Bond',
        Vorname : 'Billy',
        age : 49
      }
    },

    post() {
      return {
        ID: 1291081,
        title: 'The Myth of Freedom',
        body: 'This is not what I had hoped for when writing this blog. Endless critisism from individuals who think they have it all under their control. Their life in their hands, I wish, alas it is unfortuantly the way things are and what can someone like me do about that. Sorry guys!',
        published : true
      } 
    },

    greeting(parent, args, ctx, info) {
      if (args.name) {
      return `Hello ${args.name}`
      } 
      else {
        return 'Sorry. No name Provided!'
      }
    },

    add(parent, args) {
      console.log(args)
      if (args.a && args.b) {
      return args.a + args.b
      } 
      
      else if (!args.a || !args.b) {
        return null
      }

    else {
      return 50079
    }
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