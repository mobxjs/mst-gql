import * as fs from "fs"
import { PubSub } from "graphql-subscriptions"
import { ChuckNorris } from "fakergem"
import { v4 } from "node-uuid"

import { RootStore } from "./models"
import { values } from "mobx"

// Fake message dispatcher
let id = 0

const pubsub = new PubSub()

export const typeDefs = fs.readFileSync(__dirname + "/schema.graphql", "utf8")

const dataFile = fs.existsSync(__dirname + "/db/data.json")
  ? __dirname + "/db/data.json"
  : __dirname + "/db/initial.json"
const store = RootStore.create(JSON.parse(fs.readFileSync(dataFile, "utf8")))

export const resolvers = {
  Query: {
    messages: () =>
      values(store.messages).map(msg => {
        const user = values(store.users).find(user => user.id === msg.user)
        console.dir(msg.toJSON())
        console.dir(msg.user.toJSON())
        return {
          ...msg.toJSON(),
          user: msg.user.toJSON()
        }
      }),
    message: (_, { id }) =>
      resolvers.Query.messages().filter(msg => msg.id === id)[0],
    me: () => values(store.users).find(user => user.id === "mweststrate")
  },
  Subscription: {
    newMessages: {
      subscribe: () => pubsub.asyncIterator("newMessages")
    }
  },
  Mutation: {
    changeName: (root, args, context) => {
      const { id, name } = args
      const user = values(store.users).find(user => user.id === id)
      user.name = name
      return user
    }
  }
}

module.exports = {
  typeDefs,
  resolvers,
  context: (headers, secrets) => {
    return {
      headers,
      secrets
    }
  }
}

function nextId() {
  return "" + ++id
}

setInterval(
  () =>
    pubsub.publish("newMessages", {
      newMessages:
        Math.random() < 0.7
          ? {
              id: nextId(),
              text: ChuckNorris.fact(),
              user: values(store.users).find(user => user.id === "chucknorris")
            }
          : {
              id: nextId(),
              text: "blah blah #mobx blah blah",
              user: values(store.users).find(user => user.id === "mweststrate")
            }
    }),
  5000
)

function log(thing) {
  console.dir(thing)
  return thing
}
