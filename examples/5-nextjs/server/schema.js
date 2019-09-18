const {store} = require('./store')

const typeDefs = `
  type Query {
    todos: [Todo],
    doneTodos: [Todo],
    user(id: ID!): User,
    users: [User],
  }
  type Mutation {
    toggleTodo(id: ID!): Todo,
  }
  type Todo {
    id: ID,
    text: String,
    done: Boolean,
    assignee: User,
  }
  type User {
    id: ID,
    name: String,
    likes: [String],
  }
`

const resolvers = {
  Query: {
    todos: () => {
      return store.todos
    },
    doneTodos: () => {
      return store.todos.filter(todo => todo.done)
    },
    user: (root, args) => {
      return store.users.find(user => user.id === args.id)
    },
    users: () => {
      return store.users
    }
  },
  Mutation: {
    toggleTodo: (root, args) => {
      const todo = store.todos.find(todo => todo.id === args.id)
      todo.done = !todo.done
      return todo
    }
  },
  Todo: {
    assignee: (todo) => {
      return store.users.find(user => user.id === todo.assignee)
    }
  },
}

module.exports = {
  typeDefs,
  resolvers,
}
