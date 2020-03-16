/// <reference types="jest"/>

import fs from "fs"
import path from "path"
import { buildSchema, parse } from "graphql"
import { validate } from "graphql/validation"
import { scaffold, writeFiles } from "../../../generator/generate"

const schemaContents = fs
  .readFileSync(path.resolve(__dirname, "schema.graphql"))
  .toString()
const schema = buildSchema(schemaContents)

const validateQuery = queryString => {
  const errors = validate(schema, parse(queryString))
  if (errors.length > 0) {
    console.log(queryString, errors)
  }
  expect(errors).toHaveLength(0)
}

describe("Abstract types tests", () => {
  let models // lazy loaded models module
  let mockResponses
  let mockClient
  let store

  beforeAll(() => {
    const files = scaffold(schemaContents, {
      format: "js",
      roots: ["SearchResult", "Repo"],
      namingConvention: "asis"
    })
    writeFiles(__dirname + "/models", files, "js", false)
    models = require("./models")
  })

  beforeEach(() => {
    mockResponses = []
    mockClient = {
      request(query, variables) {
        return Promise.resolve(mockResponses.shift()(query, variables)) // return and remove the first mocked response
      }
    }

    store = models.RootStore.create(undefined, {
      gqlHttpClient: mockClient
    })
  })

  test("as a lib user i want to query union field types", async () => {
    const mockSearchQuery = (query, variables) => {
      expect(variables).toEqual({ text: "noot" })
      validateQuery(query.toString())

      return {
        data: {
          search: {
            __typename: "SearchResult",
            inputQuery: "noot",
            items: [
              {
                __typename: "Movie",
                searchPreviewText: "Aap noot mies",
                director: "Steven Spielberg"
              },
              {
                __typename: "Book",
                searchPreviewText: "Blub noot",
                author: "Ernest Hemingway"
              }
            ]
          }
        }
      }
    }
    mockResponses = [mockSearchQuery]

    const { searchResultModelPrimitives, searchItemModelPrimitives } = models
    await store.querySearch(
      { text: "noot" },
      searchResultModelPrimitives.items(searchItemModelPrimitives)
    )

    const searchResults = store.searchresults.get()
    expect(searchResults.inputQuery).toBe("noot")
    const items = searchResults.items
    expect(items).toHaveLength(2)

    const movie = items[0]
    expect(movie.director).toBe("Steven Spielberg")

    const book = items[1]
    expect(book.author).toBe("Ernest Hemingway")
  })

  test("as a lib user i want to query interface field types", async () => {
    const mockRepoQuery = query => {
      validateQuery(query.toString())

      return {
        data: {
          getAllRepos: [
            {
              __typename: "Repo",
              id: "a",
              owner: {
                __typename: "User",
                id: "y",
                name: "Chuck Norris"
              }
            },
            {
              __typename: "Repo",
              id: "b",
              owner: {
                __typename: "Organization",
                id: "z",
                name: "Mobx"
              }
            }
          ]
        }
      }
    }
    mockResponses = [mockRepoQuery]

    const { repoModelPrimitives, ownerModelPrimitives } = models
    await store.queryGetAllRepos(
      {},
      repoModelPrimitives.owner(ownerModelPrimitives)
    )

    const repos = store.repos
    expect(repos.size).toBe(2)

    const chuckNorrisRepo = repos.get("a")
    expect(chuckNorrisRepo.owner.name).toBe("Chuck Norris")

    const mobxRepo = repos.get("b")
    expect(mobxRepo.owner.name).toBe("Mobx")
  })

  test("as a lib user i want to mutate interface field types", async () => {
    const addedRepos = []
    const mockAddRepoMutation = (query, variables) => {
      validateQuery(query.toString())

      const owner = variables.avatar
        ? {
            __typename: "User",
            id: addedRepos.length === 0 ? "y" : "z",
            name: variables.ownerName
          }
        : {
            __typename: "Organization",
            id: addedRepos.length === 0 ? "y" : "z",
            name: variables.ownerName
          }

      const repo = {
        __typename: "Repo",
        id: addedRepos.length === 0 ? "a" : "b",
        name: variables.name,
        owner
      }
      addedRepos.push(repo)

      return {
        data: {
          addRepo: {
            ...repo
          }
        }
      }
    }

    const mockGetReposQuery = query => {
      validateQuery(query.toString())

      return {
        data: {
          getAllRepos: addedRepos
        }
      }
    }

    mockResponses = [
      mockAddRepoMutation,
      mockAddRepoMutation,
      mockGetReposQuery
    ]

    await store.mutateAddRepo({
      name: "Repo 1",
      ownerName: "Chuck Norris",
      avatar: "http://google.com"
    })
    await store.mutateAddRepo({
      name: "Repo 2",
      ownerName: "Mobx",
      logo: "http://google.com"
    })

    const { repoModelPrimitives, ownerModelPrimitives } = models
    await store.queryGetAllRepos(
      {},
      repoModelPrimitives.owner(ownerModelPrimitives)
    )

    const repos = store.repos
    expect(repos.size).toBe(2)

    const chuckNorrisRepo = repos.get("a")
    expect(chuckNorrisRepo.owner.name).toBe("Chuck Norris")

    const mobxRepo = repos.get("b")
    expect(mobxRepo.owner.name).toBe("Mobx")
  })
})
