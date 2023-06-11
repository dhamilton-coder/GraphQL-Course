const Comment =  {
    author(parent, args, cxt) {
     return cxt.db.exampleData.find((user) => {
      return user.ID === parent.author
     })
    },


    post(parent, args, cxt) {
      return cxt.db.examplePosts.find((post) => {
       return post.ID === parent.post
      })
     }
  
  }

export {Comment as default}