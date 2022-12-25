const makeName = (name, to) => {
  return [name, to].sort().join('_');
}
const Subscription = {
  message: {
    subscribe: (parent, { from, to }, { pubsub }, info) => {
      const chatBoxName = makeName(from, "to");
      console.log(`前端有訂閱 chatBox ${chatBoxName}`)
      return pubsub.asyncIterator(`chatBox ${chatBoxName}`);//這邊return payload(結果沒有)??????//
    },
  },//hw8
  Allmessage: {
    subscribe: (parent, { from, to }, { pubsub }, info) => {
      const chatBoxName = makeName(from, '');
      console.log(`前端有全部 訂閱chatBox ${chatBoxName}`)
      return pubsub.asyncIterator(`chatBox ${chatBoxName}`);//這邊return payload(結果沒有)??????//
    },
  },//hw8
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const post = db.posts.find(
        (post) => post.id === postId && post.published,
      );

      if (!post) {
        throw new Error('Post not found');
      }

      return pubsub.asyncIterator(`comment ${postId}`);
    },
  },
  post: {
    subscribe(parent, args, { pubsub }, info) {
      return pubsub.asyncIterator('post');
    },
  },
};

export { Subscription as default };
