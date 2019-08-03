import { ApolloServer } from "apollo-server-express"
import cors from "cors"
import express from "express"
import http from "http"

import { typeDefs, resolvers } from "./schema"

const PORT = 4000

const app = express()
app.use(cors())

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.applyMiddleware({ app })

const httpServer = http.createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  )
})
