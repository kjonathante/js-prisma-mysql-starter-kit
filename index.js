const { prisma } = require('./generated/prisma-client')

// A `main` function so that we can use async/await
async function main() {

  //Error: The change you are trying to make would violate the 
  // required relation 'CarToUser' between Car and User
  //await prisma.deleteManyUsers()

  const users = await prisma.users()
  users.forEach( async (user) => {
    const deletedUser = await prisma.deleteUser( {id: user.id} )
    console.log(`Deleted User `, deletedUser)
  })

  /*
  Nodes for a type that contains a required to-one relation 
  field can only be created using a nested mutation to ensure 
  the respective field will not be null.

  these will not work:
  const user1 = await prisma.createUser({})
  const user1 = await prisma.createUser({})
  */
  const user1 = await prisma.createUser({
    car: {
      create: {
        color: 'Red'
      }      
    }
  })
  console.log(user1)

  const user2 = await prisma.createUser({
    car: {
      create: {
        color: 'Blue'
      }      
    }
  })
  console.log(user2)

  await prisma.deleteUser({id: user2.id}) // this will work if onDelete: CASCADE is set on the User type

}

main().catch(e => console.error(e))