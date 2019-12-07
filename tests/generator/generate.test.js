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

test("basic scaffolding with js naming convention to work", () => {
  const output = scaffold(
    `
type my_user {
  id: ID
  name: String!
  avatar: String!
  emptyBoxes: [possibly_empty_box]!
}

type possibly_empty_box {
  id: ID
  label: String!
  isEmpty: Boolean!
}

type Query {
  me: my_user
}
`,
    {
      roots: ["my_user", "possibly_empty_box"],
      namingConvention: "js"
    }
  )

  expect(output).toMatchSnapshot()

  expect(findFile(output, "MyUserModel.base")).toBeTruthy()
  expect(
    hasFileContent(
      findFile(output, "MyUserModel.base"),
      "emptyBoxes: types.union(types.undefined, types.array(types.union(types.null, MSTGQLRef(types.late((): any => PossiblyEmptyBoxModel))))),"
    )
  ).toBeTruthy()

  expect(findFile(output, "PossiblyEmptyBoxModel.base")).toBeTruthy()
  // root collection name shoudl be properly prularized
  expect(
    hasFileContent(
      findFile(output, "RootStore.base"),
      "possiblyEmptyBoxes: types.optional(types.map(types.late((): any => PossiblyEmptyBoxModel)), {})"
    )
  ).toBeTruthy()

  // configureStoreMixin should contain original __typenames as keys, and should have a 3rd parameter for naming
  // convention "js"
  expect(
    hasFileContent(
      findFile(output, "RootStore.base"),
      `.extend(configureStoreMixin([['my_user', () => MyUserModel], ['possibly_empty_box', () => PossiblyEmptyBoxModel]], ['my_user', 'possibly_empty_box'], "js"))`
    )
  ).toBeTruthy()
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
      "owner: types.union(types.undefined, types.null, types.union(types.late(() => UserModel), types.late(() => OrganizationModel))),"
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
      "items: types.union(types.undefined, types.array(types.union(types.null, types.union(types.late(() => MovieModel), types.late(() => BookModel))))),"
    )
  ).toBeTruthy()
})
