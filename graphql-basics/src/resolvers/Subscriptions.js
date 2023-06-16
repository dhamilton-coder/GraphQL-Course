const Subscription = {

    comment : {
        subscribe(parent, args, cxt, info) {
            const post = cxt.db.examplePosts.find((post) => post.ID === args.postID)

            if (!post || post.published === false) {
                throw new Error('Post Not Found !')
            }
            
            return cxt.pubsub.asyncIterator(`comment ${args.postID}`)
        }
    },

    post: {
        subscribe(parent, args, cxt, info) {
            return cxt.pubsub.asyncIterator('post')
        }
    }

}
    
  



export { Subscription as default }


