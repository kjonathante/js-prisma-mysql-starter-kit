module.exports = {
  createDraft(root, args, context) {
    return context.prisma.createPost(
      {
        title: args.title,
        author: {
          connect: { id: args.userId }
        }
      },

    )
  },
  publish(root, args, context) {
    return context.prisma.updatePost(
      {
        where: { id: args.postId },
        data: { published: true },
      },

    )
  },
  createUser(root, args, context) {
    return context.prisma.createUser(
      { name: args.name },
    )
  },
  hello(root, args, context) {
    context.pubsub.publish('SOMETHING', { hi: 'world' });
    return 'world'
  }
}