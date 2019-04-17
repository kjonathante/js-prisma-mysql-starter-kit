module.exports = {
  hi: {
    // subscribe: (...args) => {
    //   console.dir(args, {depth: 1});
    subscribe: (root, args, context) => {
      return context.pubsub.asyncIterator('SOMETHING')
    }
  }
}