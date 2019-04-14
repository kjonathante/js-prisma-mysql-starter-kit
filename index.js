const { prisma } = require('./generated/prisma-client')

// A `main` function so that we can use async/await
async function main() {

  await prisma.deleteManyCategories({})
  await prisma.deleteManyArticles({})
  
  const category1 = await prisma.createCategory({})
  console.log(`Created new category: (ID: ${category1.id})`)

  const category2 = await prisma.createCategory({})
  console.log(`Created new category: (ID: ${category2.id})`)

  const category3 = await prisma.createCategory({})
  console.log(`Created new category: (ID: ${category3.id})`)


  const article1 = await prisma.createArticle({})
  console.log(`Created new article: (ID: ${article1.id})`)

  await prisma.updateArticle({
    where: { id: article1.id },
    data: {
      categories: { connect: {id : category1.id } }
    }
  })

  const article2 = await prisma.createArticle({
    categories: {
      connect: [{id: category1.id}, {id: category2.id}, {id: category3.id}]
    }
  })
  console.log(`Created new article: (ID: ${article2.id})`)

  const categoryToArticles = await prisma.category({id: category1.id}).articles()
  console.log(`\nShowing all articles related to category ${category1.id}`)
  console.log(categoryToArticles)

  const articleToCategories = await prisma.article({id: article2.id}).categories()
  console.log(`\nShowing all categories related to article ${article2.id}`)
  console.log(articleToCategories)
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