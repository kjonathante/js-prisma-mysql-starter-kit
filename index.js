const { prisma } = require('./generated/prisma-client')

// A `main` function so that we can use async/await
async function main() {

  await prisma.deleteManyUsers({ id_not: 'cjuf7bvic001v0796ube6p781' });

  const user1 = await prisma.createUser({ name: 'Mia' })
  console.log(`Created new user: ${user1.name} (ID: ${user1.id})`)

  const user2 = await prisma.createUser({ name: 'Stephanie' })
  console.log(`Created new user: ${user2.name} (ID: ${user2.id})`)

  const user3 = await prisma.createUser({ name: 'Olivia' })
  console.log(`Created new user: ${user3.name} (ID: ${user3.id})`)

  const user4 = await prisma.createUser({ name: 'Andrea' })
  console.log(`Created new user: ${user4.name} (ID: ${user4.id})`)

  const user5 = await prisma.createUser({ 
    name: 'Emma',
    following: {
      connect: { id: user1.id }
    }
  })
  console.log(`Created new user: ${user5.name} (ID: ${user5.id})`)

  await prisma.updateUser({
    data: {
      followers: {
        connect: { id: user5.id }
      }
    },
    where: {
      id: user1.id
    }
  })

  const followersOfUser1 = await prisma
    .user({ id: user1.id })
    .followers()
  console.log(`Followers of the user1: ${JSON.stringify(followersOfUser1)}`)

  const followingOfUser5 = await prisma
    .user({ id: user5.id })
    .following()
  console.log(`Followings of the user5: ${JSON.stringify(followingOfUser5)}`)


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