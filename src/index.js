const { prisma } = require('./generated/prisma-client')
const { ApolloServer, gql, PubSub } = require('apollo-server');
const pubsub = new PubSub();

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Post = require('./resolvers/Post')
const User = require('./resolvers/User')
//const Subscription = require('./resolvers/Subscription')

// The GraphQL schema
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
//   type Subscription {
//     hi: String
//   }
// `;
const typeDefs = gql`
type Query {
  publishedPosts: [Post!]!
  post(postId: ID!): Post
  postsByUser(userId: ID!): [Post!]!
}

type Mutation {
  createUser(name: String!): User
  createDraft(title: String!, userId: ID!): Post
  publish(postId: ID!): Post
}

type User {
  id: ID!
  email: String
  name: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  published: Boolean!
  author: User
}
`

// A map of functions which return data for the schema.
const resolvers = {
  Query,
  Mutation,
  Post,
  User
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({req, connection}) => {
    if (connection) {
      // check connection for metadata
      // return connection.context;
      return Object.assign(
        {
          pubsub
        },
        connection.context
      )
    } else {
      // check from req
      const token = req.headers.authorization || "";
      return { token, pubsub, prisma };
    }
  },
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      // console.log('from onConnect')
      // return { hello: 'world' }
    },
    onDisconnect: (webSocket, context) => {
      // console.log('from onDisconnect')
    }
  }
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
/*
// A `main` function so that we can use async/await
async function main() {
  await prisma.deleteManyUsers();
  await prisma.deleteManyPosts();

  // Create a new user with a new post
  const newUser = await prisma
    .createUser({
      name: "Bob",
      email: "bob@prisma.io",
      posts: {
        create: [{
          title: "Join us for GraphQL Conf in 2019",
        }, {
          title: "Subscribe to GraphQL Weekly for GraphQL news",
        }]
      },
    })
  console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`)

  // Read all users from the database and print them to the console
  const allUsers = await prisma.users()
  console.log("\nAll users ", allUsers)

  const allPosts = await prisma.posts()
  console.log("\nAll posts ", allPosts)

  // Read the previously created user from the database and print their posts to the console
  const postsByUser = await prisma
    .user({ email: "bob@prisma.io" })
    .posts()
  console.log("\nAll posts by that user ", postsByUser)

}

main().catch(e => console.error(e))
*/
/*
// Fetch single user
const user = await prisma.user({ id: '__USER_ID__' })
// Filter user list
const usersCalledAlice = await prisma.users({
  where: { name: 'Alice' }
})
// Update a user's name
const updatedUser = await prisma.updateUser({
  where: { id: '__USER_ID__' },
  data: { name: 'Bob' }
})
// Delete user
const deletedUser = await prisma.deleteUser({ id: '__USER_ID__' })
*/