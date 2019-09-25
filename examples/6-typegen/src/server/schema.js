const fetch = require("isomorphic-fetch")

const store = {
  todos: [
    {
      id: 0,
      text: "Go to the shops",
      complete: false,
      owner: 0
    },
    {
      id: 1,
      text: "Pick up the kids",
      complete: true,
      owner: 0
    },
    {
      id: 2,
      text: "Install mst-gql",
      complete: false,
      owner: 0
    }
  ],
  users: [
    {
      id: 0,
      email: "test@test.test",
      todos: [0, 1, 2]
    }
  ]
}

const typeDefs = `
  type Query {
    todos: [Todo]
    users: [User]
  }
  type Mutation {
    toggleTodo(id: ID!): Todo
    createTodo(todo: CreateTodoInput!): Todo
  }
  type Todo {
    id: ID,
    text: String,
    complete: Boolean,
    owner: User
  }
  type User {
    id: ID,
    email: String,
    todos: [Todo]
  }
  input CreateTodoInput {
    id: ID!,
    text: String!,
    owner: ID!,
    complete: Boolean,
  }
`

const resolvers = {
  Query: {
    todos: (root, args, context) => {
      return store.todos
    },
    users: (root, args, context) => {
      return store.users
    }
  },
  Mutation: {
    toggleTodo: (root, args, context) => {
      const { id } = args
      store.todos[args.id].complete = !store.todos[args.id].complete
      return store.todos[args.id]
    },
    createTodo: (root, args, context) => {
      const todo = {
        ...args.todo,
        complete: !!args.todo.complete
      }
      store.todos.push(todo)
      return todo
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
