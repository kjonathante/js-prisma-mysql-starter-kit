const hello = (root, args, context) => {
  context.pubsub.publish('SOMETHING', { hi: 'world' });
  return 'world'
}

module.exports = { hello }
