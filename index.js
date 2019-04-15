const { prisma } = require('./generated/prisma-client')

// A `main` function so that we can use async/await
async function main() {
  await prisma.deleteManyUsers(); // as of 2019-04-14 deleteMany will not do cascading delete
  await prisma.deleteManyProfiles();

  const user1 = await prisma.createUser({})
  console.log(`Created user2 ${user1.id}`, user1)

  const user2 = await prisma.createUser(
    {
      profile: {
        create: {
          lastName: 'Snow',
          firstName: 'White'
        }
      }
    }
  )
  console.log(`Created user2 ${user2.id}`, user2)

  const user3 = await prisma.createUser(
    {
      profile: {
        create: {
          lastName: 'ToBe',
          firstName: 'Deleted'
        }
      }
    }
  )
  console.log(`Created user3 ${user3.id}`, user3)

  // on delete cascade
  await prisma.deleteUser({id: user3.id}) // cascading delete works on this
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