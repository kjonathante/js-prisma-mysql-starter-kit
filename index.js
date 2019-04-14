const { prisma } = require('./generated/prisma-client')

// A `main` function so that we can use async/await
async function main() {

  await prisma.deleteManyUsers({ id_not: 'cjuf7bvic001v0796ube6p781' });

  const user1 = await prisma.createUser({ name: 'Alice' })
  console.log(`Created new user: ${user1.name} (ID: ${user1.id})`)

  const user2 = await prisma.createUser({ name: 'James' })
  console.log(`Created new user: ${user2.name} (ID: ${user2.id})`)

  const user3 = await prisma.createUser({
    name: 'Linda', 
    friends: {
      connect: [{id: user1.id}, {id: user2.id}]
    }
  })
  console.log(`Created new user: ${user3.name} (ID: ${user3.id})`)

  const user4 = await prisma.createUser({ name: 'Ricky' })
  console.log(`Created new user: ${user4.name} (ID: ${user4.id})`)

  await prisma.updateUser({
    data: {
      friends: {
        connect: [{id: user1.id}, {id: user2.id}, {id: user3.id}]
      }
    },
    where: {id: user4.id}
  })


  // Read all users from the database and print them to the console
  const allUsers = await prisma.users()
  console.log(allUsers)


  // Read the previously created user from the database and print their posts to the console
  const friendsOfUser3 = await prisma
    .user({ id: user3.id })
    .friends()
  console.log(`All friends of the user3: ${JSON.stringify(friendsOfUser3)}`)

  const friendsOfUser4 = await prisma
    .user({ id: user4.id })
    .friends()
  console.log(`All friends of the user4: ${JSON.stringify(friendsOfUser4)}`)
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