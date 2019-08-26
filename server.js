const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const { findOrCreateUser } = require('./controllers/userController')



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB is connected'))
  .catch(err => console.error(err))
mongoose.set("useFindAndModify", false)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: async ({ req }) => {
    let authToken = null
    let currentUser = null
    try {
      authToken = req.headers.authorization
      if (authToken) {
        currentUser = await findOrCreateUser(authToken)
      }
    } catch (err) {
      console.warn(`unable to authenticate user with token ${authToken}`, err)
    }
    return { authToken, currentUser }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server listening at ${url}.`)
})