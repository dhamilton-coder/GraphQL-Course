const Query = {
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

    users (parent, args, cxt) {
      if (args.query) {
        return cxt.db.exampleData.filter((user) => {
          return user.Nachname.toLowerCase().includes(args.query.toLowerCase())
        })
      } else {
        return cxt.db.exampleData
      }
      
    },

    getPosts (parent, args, cxt) {
  
       if (args.ID) {
        return cxt.db.examplePosts.filter((post) => {
          return post.ID.includes(args.ID)
        })
      }

      else if (args.title) {
        return cxt.db.examplePosts.filter((post) => {
          return post.title.toLowerCase().includes(args.title.toLowerCase())
        })
      }

      else if (args.body) {
        return cxt.db.examplePosts.filter((post) => {
          return post.body.toLowerCase().includes(args.body.toLowerCase())
        })
     
      }

      else if (args.published) {
        return cxt.db.examplePosts.filter((post) => {
          return post.published.includes(args.published)
        })
      }

      else {
        return cxt.db.examplePosts
      }
      
    },

    getAllPosts(parent, args, cxt) {
      return cxt.db.examplePosts
    },

    getComments (parent, args, cxt) {
      return cxt.db.exampleComments
    },
  }

  export {Query as default}