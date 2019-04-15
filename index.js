const { prisma } = require('./generated/prisma-client')

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