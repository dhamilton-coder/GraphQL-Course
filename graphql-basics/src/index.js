import { GraphQLServer } from 'graphql-yoga'
const chalk = require('chalk')


const exampleComments = [{
  ID: 12910812321,
  text: 'Comment One',
  author : '2131223111',
  post : 1291081
  
},

{

  ID : 327480928231231,
  text : 'Comment Two',
  author : '8219038120',
  post : 1291081
},

{

  ID : 32748092843213123,
  text: 'Comment Three',
  author : '2131223111',
  post : 1291081

}]



const examplePosts = [{
  ID: 1291081,
  title: 'The Myth of Freedom',
  body: 'This is not what I had hoped for when writing this blog. Endless critisism from individuals who think they have it all under their control. Their life in their hands, I wish, alas it is unfortuantly the way things are and what can someone like me do about that. Sorry guys!',
  published : true,
  author : '2131223111'
  
},

{

  ID : 327480928,
  title: 'The Wonders of the Sea',
  body: `Sorry, i'm to lazy to write another blog. `,
  published : false,
  author : '21312312'
},

{

  ID : 32748092843,
  title: 'How did we get here? ( Evolution : A basic guide )',
  body: `Sorry, i'm to lazy to write another blog. `,
  published : false,
  author : '2131223111'
}]


const exampleData = [{

  ID : '21312312',
  Nachname : 'Bond',
  Vorname : 'Billy',
  age : 49

},

{
  ID : '2131223111',
Nachname : 'David',
Vorname : 'Hangerson',
age : 67
},

{
  ID : '8219038120',
  Nachname : 'Hello',
  Vorname : 'Jello',
  age : 109
}]

const typeDefs = `
type Query {
  users(query : String) : [User!]!
  getPosts(body : String, title : String, ID : Int, published : Boolean): [Post!]!
  me : User!
  post : Post!
  getComments : [Comment!]
}


type User {
  ID : ID!
  Nachname : String!
  Vorname : String!
  age: String!
  posts : [Post!]!
  comments : [Comment!]!

},

type Post {
  ID : ID!
  title : String!
  body :  String!
  published : Boolean!
  author : User!,
}


type Comment {
  ID: ID!
  text: String!
  author : User!
  post : Post!
}
`

const resolvers = {
    Query: {
    me() {
      return {
        ID : '21312312',
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
        published : true,
      } 
    },

    users (parent, args) {
      if (args.query) {
        return exampleData.filter((user) => {
          return user.Nachname.toLowerCase().includes(args.query.toLowerCase())
        })
      } else {
        return exampleData
      }
      
    
    },

    
    getPosts (parent, args) {
  
       if (args.ID) {
        return examplePosts.filter((post) => {
          return post.ID.includes(args.ID)
        })
      }

      else if (args.title) {
        return examplePosts.filter((post) => {
          return post.title.toLowerCase().includes(args.title.toLowerCase())
        })
      }

      else if (args.body) {
        return examplePosts.filter((post) => {
          return post.body.toLowerCase().includes(args.body.toLowerCase())
        })
     
      }

      else if (args.published) {
        return examplePosts.filter((post) => {
          return post.published.includes(args.published)
        })
      }

      else {
        return examplePosts
      }
      
    
    },

    getComments (parent, args) {
      return exampleComments
    }

  },
  Post: {
    author(parent, args) {
      return exampleData.find((user) => {
        return user.ID === parent.author
      })
    }
  },

  User: {

    posts(parent, args) {
      return examplePosts.filter((post) => {
        return post.author === parent.ID
          
      })
    },
    comments(parent,args) {
    return exampleComments.filter((comment) => {
      return comment.author === parent.ID
    })
  }


  },

  Comment : {
    author(parent, args) {
     return exampleData.find((user) => {
      return user.ID === parent.author
     })
    },


    post(parent, args) {
      return examplePosts.find((post) => {
       return post.ID === parent.post
      })
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