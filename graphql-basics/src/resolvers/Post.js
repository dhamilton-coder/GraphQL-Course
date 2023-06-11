const Post = {
    author(parent, args, cxt) {
      return cxt.db.exampleData.find((user) => {
        return user.ID === parent.author
      })
    },

    comments(parent, args, cxt) {
      return cxt.db.exampleComments.filter((comment) => {
        return comment.post === parent.ID
      })
    }
  }

export {Post as default}