/// <reference types="jest"/>

const fs = require("fs")
const { getSnapshot, unprotect, applySnapshot } = require("mobx-state-tree")
const { scaffold, writeFiles } = require("../../../generator/generate")

describe("unionTypes tests", () => {
  let models // lazy loaded models module

  function mockLoadTodoList(query, variables) {
    expect(variables).toEqual(undefined)
    return {
      data: {
        todoLists: [
          {
            id: "c",
            __typename: "TodoList",
            todos: [
              {
                id: "a",
                __typename: "BasicTodo",
                complete: true,
                text: "Initially loaded todo, now updated"
              },
              {
                id: "b",
                __typename: "FancyTodo",
                complete: false,
                label: "Initially loaded todo",
                color: "red"
              }
            ]
          }
        ]
      }
    }
  }

  beforeAll(() => {
    const files = scaffold(
      fs.readFileSync(__dirname + "/todos.graphql", "utf8"),
      { format: "js", roots: ["TodoList", "BasicTodo", "FancyTodo"] }
    )
    writeFiles(__dirname + "/models", files, "js", false)
    models = require("./models")
  })

  test("it should rehydrate union types from snapshot correctly", async () => {
    const mockResponses = [mockLoadTodoList]
    const mockClient = {
      request(query, variables) {
        return Promise.resolve(mockResponses.shift()(query, variables)) // return and remove the first mocked response
      }
    }
    const store = models.RootStore.create(
      {},
      { gqlHttpClient: mockClient, ssr: true }
    )

    await store.queryTodoLists()

    expect(
      store.todoLists.get("c").todos.filter((f) => f.complete)
    ).toHaveLength(1)

    const store2 = models.RootStore.create(
      {},
      { gqlHttpClient: mockClient, ssr: true }
    )

    const ss = getSnapshot(store)
    applySnapshot(store2, ss)
    expect(
      store2.todoLists.get("c").todos.filter((f) => f.complete)
    ).toHaveLength(1)
  })

  test("it should get todo by reference", () => {
    const basicTodoItemSnapshot = {
      id: "custom-item",
      complete: true,
      text: "something"
    }

    const storeSnapshot = {
      todoLists: {
        "custom-list": { id: "custom-list", todos: ["custom-item"] }
      },
      basicTodos: {
        [basicTodoItemSnapshot.id]: basicTodoItemSnapshot
      }
    }

    const store = models.RootStore.create(storeSnapshot, {})

    expect(store.todoLists.get("custom-list").todos[0].text).toBe(
      basicTodoItemSnapshot.text
    )
  })
})
