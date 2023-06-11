import { GraphQLServer } from 'graphql-yoga'
const chalk = require('chalk')
import { v4 as uuidv4 } from 'uuid';



const Mutation = {
    createUser(parent, args, cxt) {

      const VornameTaken = cxt.db.exampleData.some((user) => {
        return user.Vorname === args.Vorname
      })
        if (VornameTaken) {
          return new Error('Sorry! Email Taken. Oh well :)')
  
        }

        else {
          
          const user = {
            ID : uuidv4(),
            ...args
          }
  
          cxt.db.exampleData.push(user)
          return  user
        }


    },


    deleteUser(parent, args, cxt) {

      const userIndex = cxt.db.exampleData.findIndex((user) => user.ID === args.id )

      if (userIndex === -1) {
        throw new Error('User not found!')
      }

      cxt.db.examplePosts = cxt.db.examplePosts.filter((post) => {
        const match = post.author === args.id 

        if(match) {
          cxt.db.exampleComments = cxt.db.exampleComments.filter((comment) =>   comment.post !== post.ID)
        }
        
        return !match
      })

      cxt.db.exampleComments = cxt.db.exampleComments.filter((comment) => comment.author !== args.id)

      return cxt.db.exampleData.splice(userIndex, 1)[0]
    },

    deletePost(parent, args, cxt) {
      const PostExists = cxt.db.examplePosts.find((post) => post.ID === args.id)
      if (!PostExists) {
        throw new Error('No Post Found!')
      }

      else if (PostExists.author !== args.author) {
        throw new Error('Unauthorised. Please ask for permission before deleting this post!')
      }

      const PostIndex = cxt.db.examplePosts.indexOf(PostExists)
      cxt.db.exampleComments = cxt.db.exampleComments.filter((comment) => {
        return comment.post !== args.id
      })
      return cxt.db.examplePosts.splice(PostIndex, 1)[0]
      
    },


    createPost(parent, args, cxt) {
      const UserExists = cxt.db.exampleData.some((user) => {
        return user.ID === args.author
      }
        )

      if (UserExists) {
        const post = {
          ID : uuidv4(),
          ...args
        }

        cxt.db.examplePosts.push(post)
        return(post)

      } else {
        throw new Error('No User Found!')
      }
    },

    createComment(parent, args, cxt) {

      const PostExists = cxt.db.examplePosts.some((post) => post.ID === args.post && post.published)
      const UserExists = cxt.db.exampleData.some((user) => user.ID === args.author)
      
      if (PostExists && UserExists) {
        const comment = {
          ID: uuidv4(),
          ...args
        }

        cxt.db.exampleComments.push(comment)

        return comment
      }
     
      else {
        throw new Error(`Sorry, Post/User doesn't exist.`)
      }

     
    },

    deleteComment(parent, args, cxt) {
      const CommentExists = cxt.db.exampleComments.find((comment) => comment.ID === args.id)
      if (!CommentExists) {
        throw new Error('No Comment Found!')
      }
      else if (CommentExists.author !== args.author) {
        throw new Error('Unauthorised. Please ask for permission before deleting this post!')
      }

      const commentIndex = cxt.db.exampleComments.indexOf(CommentExists)
      return cxt.db.exampleComments.splice(commentIndex, 1)[0]
    }
  }

  export {Mutation as default}
