import { GraphQLServer } from 'graphql-yoga'
const chalk = require('chalk')
import { v4 as uuidv4 } from 'uuid';




let exampleComments = [{
  ID: '12910812321',
  text: 'Comment One',
  author : '2131223111',
  post : '1291081'
  
},

{

  ID : '327480928231231',
  text : 'Comment Two',
  author : '8219038120',
  post : '1291081'
},

{

  ID : '32748092843213123',
  text: 'Comment Three',
  author : '2131223111',
  post : '1291081'

}]



let examplePosts = [{
  ID: '1291081',
  title: 'The Myth of Freedom',
  body: 'This is not what I had hoped for when writing this blog. Endless critisism from individuals who think they have it all under their control. Their life in their hands, I wish, alas it is unfortuantly the way things are and what can someone like me do about that. Sorry guys!',
  published : true,
  author : '2131223111'
  
},

{

  ID : '327480928',
  title: 'The Wonders of the Sea',
  body: `Sorry, i'm to lazy to write another blog. `,
  published : false,
  author : '21312312'
},

{

  ID : '32748092843',
  title: 'How did we get here? ( Evolution : A basic guide )',
  body: `Sorry, i'm to lazy to write another blog. `,
  published : false,
  author : '2131223111'
}]


const exampleData = [{

  ID : '21312312',
  Nachname : 'Bond',
  Vorname : 'billybond@company.com',
  age : 49

},

{
  ID : '2131223111',
Nachname : 'Daniels',
Vorname : 'daviddaniels@company.com',
age : 67
},

{
  ID : '8219038120',
  Nachname : 'Hangerson',
  Vorname : 'henryhangerson@company.com',
  age : 109
}]

let typeDefs = `
type Query {
  users(query : String) : [User!]!
  getPosts(body : String, title : String, ID : Int, published : Boolean): [Post!]!
  getAllPosts : [Post!]!
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
  comments : [Comment!]
}


type Comment {
  ID: ID!
  text: String!
  author : User!
  post : Post!
}

input UserInput {
    Nachname:String!
    Vorname:String!
    age:Int
   } 

input PostInput {
  title: String!
   body: String
   published: Boolean!
   author : ID!
   } 

   input CommentInput {
    text: String!
    author: ID!
    post: ID
     } 


type Mutation {
  createUser(data : UserInput ): User!
  deleteUser(id: ID!) : User!
  createPost(data : PostInput) : Post!
  deletePost(id: ID! author: ID!) : Post!
  createComment(data : CommentInput) : Comment!
  deleteComment(id : ID! author : ID!) : Comment!
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

    getAllPosts() {
      return examplePosts
    },

    getComments (parent, args) {
      return exampleComments
    },

  

  },

  Mutation: {
    createUser(parent, args) {

      const VornameTaken = exampleData.some((user) => {
        return user.Vorname === args.data.Vorname
      })
        if (VornameTaken) {
          return new Error('Sorry! Email Taken. Oh well :)')
  
        }

        else {
          
          const user = {
            ID : uuidv4(),
            ...args.data
          }
  
          exampleData.push(user)
          return  user
        }


    },


    deleteUser(parent, args) {

      const userIndex = exampleData.findIndex((user) => user.ID === args.id )

      if (userIndex === -1) {
        throw new Error('User not found!')
      }

      examplePosts = examplePosts.filter((post) => {
        const match = post.author === args.id 

        if(match) {
          exampleComments = exampleComments.filter((comment) =>   comment.post !== post.ID)
        }
        
        return !match
      })

      exampleComments = exampleComments.filter((comment) => comment.author !== args.id)

      return exampleData.splice(userIndex, 1)[0]
    },

    deletePost(parent, args) {
      const PostExists = examplePosts.find((post) => post.ID === args.id)
      if (!PostExists) {
        throw new Error('No Post Found!')
      }

      else if (PostExists.author !== args.author) {
        throw new Error('Unauthorised. Please ask for permission before deleting this post!')
      }

      const PostIndex = examplePosts.indexOf(PostExists)
      exampleComments = exampleComments.filter((comment) => {
        return comment.post !== args.id
      })
      return examplePosts.splice(PostIndex, 1)[0]
      
    },


    createPost(parent, args) {
      const UserExists = exampleData.some((user) => {
        return user.ID === args.data.author
      }
        )

      if (UserExists) {
        const post = {
          ID : uuidv4(),
          ...args.data
        }

        examplePosts.push(post)
        return(post)

      } else {
        throw new Error('No User Found!')
      }
    },

    createComment(parent, args) {

      const PostExists = examplePosts.some((post) => post.ID === args.data.post && post.published)
      const UserExists = exampleData.some((user) => user.ID === args.data.author)
      
      if (PostExists && UserExists) {
        const comment = {
          ID: uuidv4(),
          ...args.data
        }

        exampleComments.push(comment)

        return comment
      }
     
      else {
        throw new Error(`Sorry, Post/User doesn't exist.`)
      }

     
    },

    deleteComment(parent, args) {
      const CommentExists = exampleComments.find((comment) => comment.ID === args.id)
      if (!CommentExists) {
        throw new Error('No Comment Found!')
      }
      else if (CommentExists.author !== args.author) {
        throw new Error('Unauthorised. Please ask for permission before deleting this post!')
      }

      const commentIndex = exampleComments.indexOf(CommentExists)
      return exampleComments.splice(commentIndex, 1)[0]
    }
  },
  
  
  Post: {
    author(parent, args) {
      return exampleData.find((user) => {
        return user.ID === parent.author
      })
    },

    comments(parent, args) {
      return exampleComments.filter((comment) => {
        return comment.post === parent.ID
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