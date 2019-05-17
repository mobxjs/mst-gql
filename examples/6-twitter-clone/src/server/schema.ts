import * as fs from "fs"
import { getSnapshot } from "mobx-state-tree"

import { RootStore } from "./models"

export const typeDefs = fs.readFileSync(__dirname + "/schema.graphql", "utf8")

const store = RootStore.create()

export const resolvers = {
  Query: {
    messages: () => store.allMessages(),
    message: (_, { id }) => store.getMessage(id),
    me: () => store.users.get("mweststrate").serialize()
  },
  Subscription: {
    newMessages: {
      subscribe: () => store.getPubSub().asyncIterator("newMessages")
    }
  },
  Mutation: {
    changeName: (root, { id, name }, context) => {
      const user = store.users.get(id)
      user.setName(name)
      return user.serialize()
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
