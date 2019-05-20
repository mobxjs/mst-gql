import { makeExecutableSchema } from "graphql-tools"
import { execute, subscribe } from "graphql"
import { createServer } from "http"
import { SubscriptionServer } from "subscriptions-transport-ws"
import { ApolloServer } from "apollo-server-express"
import cors from "cors"
import express from "express"

import { typeDefs, resolvers } from "./schema"

const PORT = 4000
const WS_PORT = 4001

// Setup websocket server
const websocketServer = createServer((request, response) => {
  response.writeHead(404)
  response.end()
})

const subscriptionServer = SubscriptionServer.create(
  {
    execute,
    subscribe,
    schema: makeExecutableSchema({ typeDefs, resolvers })
  },
  {
    server: websocketServer,
    path: "/graphql"
  }
)

websocketServer.listen(WS_PORT, () =>
  console.log(`Websocket Server is now running on http://localhost:${WS_PORT}`)
)

const app = express()

// @ts-ignore
app.use(cors())

const server = new ApolloServer({
  // @ts-ignore
  typeDefs,
  resolvers,
  subscriptionsPath: `http://localhost:${WS_PORT}`
})

server.applyMiddleware({ app })

app.listen({ port: PORT }, () =>
  console.log(
    `server listening at http://localhost:${PORT}${server.graphqlPath}`
  )
)
