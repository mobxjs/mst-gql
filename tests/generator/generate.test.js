/// <reference types="jest"/>

const { scaffold } = require("../../generator/generate")
const escapeStringRegexp = require("escape-string-regexp")

const toRegex = snippet => new RegExp(`\\s+${escapeStringRegexp(snippet)}\\s+`)
const findFile = (output, name) =>
  output.find(o => o.length && o.length > 1 && o[0] === name)
const hasFileContent = (file, snippet) => file[1].match(toRegex(snippet))

test("basic scaffolding to work", () => {
  expect(
    scaffold(
      `
type User {
  id: ID
  name: String!
  avatar: String!
}
type Query {
  me: User
}
`,
      { roots: ["User"] }
    )
  ).toMatchSnapshot()
})

test("interface field type to work", () => {
  const output = scaffold(
    `
interface Owner {
  id: ID!
  name: String!
}      
type User implements Owner {
  id: ID!
  name: String!
  avatar: String!
}
type Organization implements Owner {
  id: ID!
  name: String!
  logo: String!
}
type Repo {
  id: ID!
  owner: Owner
}
type Query {
  repo: Repo
}
`,
    { roots: ["Repo"] }
  )
  expect(output).toMatchSnapshot()

  expect(findFile(output, "OwnerModelSelector")).toBeTruthy()

  const repoModelBase = findFile(output, "RepoModel.base")
  expect(repoModelBase).toBeTruthy()
  expect(
    hasFileContent(
      repoModelBase,
      "owner: types.maybeNull(types.maybe(types.union(types.late(() => UserModel), types.late(() => OrganizationModel)))),"
    )
  ).toBeTruthy()
})

test("union field type to work", () => {
  const output = scaffold(
    `
type Movie {
  description: String!
  director: String!
}
type Book {
  description: String!
  author: String!
}
union SearchItem = Movie | Book
type SearchResult {
  inputQuery: String!
  items: [SearchItem]!
}
type Query {
  search(text: String!): SearchResult!
}
`,
    { roots: ["SearchResult"] }
  )
  expect(output).toMatchSnapshot()

  expect(findFile(output, "SearchItemModelSelector")).toBeTruthy()

  const searchResultBase = findFile(output, "SearchResultModel.base")
  expect(searchResultBase).toBeTruthy()
  expect(
    hasFileContent(
      searchResultBase,
      "items: types.maybe(types.array(types.maybeNull(types.union(types.late(() => MovieModel), types.late(() => BookModel))))),"
    )
  ).toBeTruthy()
})
