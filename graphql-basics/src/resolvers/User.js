const User = {

    posts(parent, args, cxt) {
      return cxt.db.examplePosts.filter((post) => {
        return post.author === parent.ID
          
      })
    },
    comments(parent,args, cxt) {
    return cxt.db.exampleComments.filter((comment) => {
      return comment.author === parent.ID
    })
  }


  }

export {User as default}