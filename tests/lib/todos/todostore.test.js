/// <reference types="jest"/>

const fs = require("fs")
const { scaffold, writeFiles } = require("../../../generator/generate")

describe("todos.graphql tests", () => {
  let models // lazy loaded models module

    /** This functions provides a mock implementation for loading todos from the graphql endpoint. Also verifies the incoming arguments */
    function mockLoadTodos(query, variables) {
      expect(query).toMatchInlineSnapshot(`
                        "query todos { todos {
                                __typename
                        id
                        text
                        complete

                              } }"
                  `)
      expect(variables).toEqual(undefined)
      return {
        data: {
          todos: [
            {
              id: "a",
              __typename: "Todo",
              complete: true,
              text: "Initially loaded todo, now updated"
            },
            {
              id: "b",
              __typename: "Todo",
              complete: false,
              text: "Another todo"
            }
          ]
        }
      }
    }

    /** This functions provides a mock implementation for mutating a todo. Also verifies the incoming arguments */
    function mockToggleTodos(query, variables) {
      expect(query).toMatchInlineSnapshot(`
        "mutation toggleTodo($id: ID!) { toggleTodo(id: $id) {
                __typename
        id
        complete

              } }"
      `)
      expect(variables).toEqual({ id: "b" })
      return {
        data: {
          toggleTodo: { id: "b", __typename: "Todo", complete: true }
        }
      }
    }

  beforeAll(() => {
    const files = scaffold(
      fs.readFileSync(__dirname + "/todos.graphql", "utf8"),
      { format: "js", roots: ["Todo"] }
    )
    writeFiles(__dirname + "/models", files, "js", false)
    models = require("./models")
  })

  test("it should be able to instantiate store and load initial data", async () => {

    /** This test will make two following two requests */
    const mockResponses = [mockLoadTodos, mockToggleTodos]
    const mockClient = {
      request(query, variables) {
        return Promise.resolve(mockResponses.shift()(query, variables)) // return and remove the first mocked response
      }
    }

    /** Create a store with some initial state */
    const store = models.RootStore.create(
      {
        todos: {
          a: {
            id: "a",
            __typename: "Todo",
            complete: false,
            text: "Initially loaded todo"
          }
        }
      },
      {
        gqlHttpClient: mockClient
      }
    )

    // initially, 1 todo
    expect(store.toJSON()).toMatchSnapshot()

    // Then, the 2 todos mocked above should be loaded and merged
    const promise = store.queryTodos()
    expect(store.__promises.size).toBe(0)
    await promise
    expect(store.todos.size).toBe(2)
    expect(store.todos.get("a").text).toBe("Initially loaded todo, now updated")

    const todoB = store.todos.get("b")
    expect(todoB.text).toBe("Another todo")
    expect(todoB.complete).toBe(false)

    // Finally, also toggle a todo
    await todoB.toggle()
    expect(todoB.complete).toBe(true)
  })

  test("it should preload and push pending queries to '__promises'", async () => {

    /** This test will make two following two requests */
    const mockResponses = [mockLoadTodos, mockToggleTodos]
    const mockClient = {
      request(query, variables) {
        return Promise.resolve(mockResponses.shift()(query, variables)) // return and remove the first mocked response
      }
    }
    /** Create a store with some initial state */
    const store = models.RootStore.create(
      {
        todos: {
          a: {
            id: "a",
            __typename: "Todo",
            complete: false,
            text: "Initially loaded todo"
          }
        }
      },
      {
        gqlHttpClient: mockClient,
        ssr: true
      }
    )

    store.queryTodos()
    await Promise.all(store.__promises)
    expect(store.todos.size).toBe(2)
    const todoB = store.todos.get("b")
    expect(todoB.text).toBe("Another todo")
    expect(todoB.complete).toBe(false)
  })
})
