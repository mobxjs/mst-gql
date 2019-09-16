const {promisify} = require('util')
const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const next = require("next")
const { resolvers, typeDefs } = require("./schema")

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000

async function main () {
  const expressServer = express()

  const apolloServer = new ApolloServer({ typeDefs, resolvers })
  apolloServer.applyMiddleware({
    app: expressServer,
    path: "/api/graphql"
  })

  const nextServer = next({ dev })
  await nextServer.prepare()
  expressServer.all("*", nextServer.getRequestHandler())

  const listenFn = promisify(expressServer.listen.bind(expressServer))
  await listenFn(port)
  console.log(`> Ready on http://localhost:${port}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
