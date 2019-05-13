const { PubSub } = require("graphql-subscriptions")
const { ChuckNorris } = require("fakergem")

const pubsub = new PubSub()

const store = {
  messages: [
    {
      id: nextId(),
      text: "#MobX is cool",
      user: "mweststrate"
    },
    {
      id: nextId(),
      text: ChuckNorris.fact(),
      user: "chucknorris"
    },
    {
      id: nextId(),
      text: ChuckNorris.fact(),
      user: "chucknorris"
    }
  ],
  users: [
    {
      id: "mweststrate",
      name: "Michel Weststrate",
      avatar:
        "https://pbs.twimg.com/profile_images/1126182603944599558/BlES9eyZ_400x400.jpg"
    },
    {
      id: "chucknorris",
      name: "Chuck Norris",
      avatar:
        "https://beardoholic.com/wp-content/uploads/2017/12/c74461ae2a9917a2482ac7b53f195b3c6e2fdd59e778c673256fb29d1b07f181.jpg"
    }
  ]
}

const typeDefs = `
  type Query {
    messages: [Message]
  }
  type Subscription {
    newMessages: Message
  }
  type Message {
    id: ID,
    from: String,
    message: String,
  }
`

const resolvers = {
  Query: {
    messages: store.messages
  },
  Subscription: {
    newMessages: {
      subscribe: () => pubsub.asyncIterator("newMessages")
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

// Fake message dispatcher
let id = 0

function nextId() {
  return "" + ++id
}

setInterval(
  () =>
    pubsub.publish("newMessages", {
      newMessages: {
        id: nextId(),
        text: ChuckNorris.fact(),
        user: "chucknorris"
      }
    }),
  5000
)
