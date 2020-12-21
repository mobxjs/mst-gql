/// <reference types="jest"/>

const { scaffold } = require("../../generator/generate")
const escapeStringRegexp = require("escape-string-regexp")

const toRegex = (snippet) =>
  new RegExp(`\\s+${escapeStringRegexp(snippet)}\\s+`)
const findFile = (output, name) =>
  output.find((o) => o.length && o.length > 1 && o[0] === name)
const hasFileContent = (file, snippet) => file[1].match(toRegex(snippet))
const hasFileContentExact = (file, snippet) => file[1].indexOf(snippet) != -1
const hasFileContentRegexp = (file, snippet) => file[1].match(snippet)

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
      {
        roots: ["User"],
        namingConvention: "asis"
      }
    )
  ).toMatchSnapshot()
})

test("basic scaffolding with js naming convention, specific query type to work", () => {
  const output = scaffold(
    `
    
schema {
  query: query_root
}
    
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

type query_root {
  me: my_user
}
`,
    {
      roots: ["my_user", "possibly_empty_box"]
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
  expect(findFile(output, "PossiblyEmptyBoxModel")).toBeTruthy()
  // TS type name should be just PossiblyEmptyBox and not PossiblyEmptyBoxModelType
  expect(
    hasFileContent(
      findFile(output, "PossiblyEmptyBoxModel"),
      "export interface PossiblyEmptyBoxModelType extends Instance<typeof PossiblyEmptyBoxModel.Type> {}"
    )
  ).toBeTruthy()

  // root collection name should be properly prularized
  expect(
    hasFileContent(
      findFile(output, "RootStore.base"),
      "possiblyEmptyBoxes: types.optional(types.map(types.late((): any => PossiblyEmptyBoxModel)), {})"
    )
  ).toBeTruthy()

  expect(
    hasFileContent(
      findFile(output, "RootStore.base"),
      "queryMe(variables?: {  }, resultSelector: string | ((qb: MyUserModelSelector) => MyUserModelSelector) = myUserModelPrimitives.toString(), options: QueryOptions = {}) {"
    )
  ).toBeTruthy()

  // configureStoreMixin should contain original __typenames as keys, and should have a 3rd parameter for naming
  // convention "js"
  expect(
    hasFileContent(
      findFile(output, "RootStore.base"),
      `.extend(configureStoreMixin([['query_root', () => QueryRootModel], ['my_user', () => MyUserModel], ['possibly_empty_box', () => PossiblyEmptyBoxModel]], ['my_user', 'possibly_empty_box'], "js"))`
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
    {
      roots: ["Repo"],
      namingConvention: "asis"
    }
  )
  expect(output).toMatchSnapshot()

  expect(findFile(output, "OwnerModelSelector")).toBeTruthy()

  const repoModelBase = findFile(output, "RepoModel.base")
  expect(repoModelBase).toBeTruthy()
  expect(
    hasFileContent(
      repoModelBase,
      "owner: types.union(types.undefined, types.null, types.union(types.late((): any => UserModel), types.late((): any => OrganizationModel))),"
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
    {
      roots: ["SearchResult"],
      namingConvention: "asis"
    }
  )
  expect(output).toMatchSnapshot()

  expect(findFile(output, "SearchItemModelSelector")).toBeTruthy()

  const searchResultBase = findFile(output, "SearchResultModel.base")
  expect(searchResultBase).toBeTruthy()
  expect(
    hasFileContent(
      searchResultBase,
      "items: types.union(types.undefined, types.array(types.union(types.null, types.union(types.late((): any => MovieModel), types.late((): any => BookModel))))),"
    )
  ).toBeTruthy()
})

test("when array is not required, should be optional in TS", () => {
  const output = scaffold(
    `
type Movie {
  description: String!
  director: String!
}
input MovieInput {
  description: [String!]!
  director: [String!]
}

type Query {
  search(text: [MovieInput!]): Movie!
}
`,
    {}
  )
  expect(output).toMatchSnapshot()

  const searchResultBase = findFile(output, "RootStore.base")
  expect(searchResultBase).toBeTruthy()
  expect(
    hasFileContent(
      searchResultBase,
      "querySearch(variables: { text?: MovieInput[] },"
    )
  ).toBeTruthy()

  // director array of strings should be optional
  expect(hasFileContent(searchResultBase, "director?:")).toBeTruthy()

  // description array of strings should be required
  expect(hasFileContent(searchResultBase, "description:")).toBeTruthy()
})

test("enums ending in Enum doesn't have an extra Enum postfix with namingConvention=asis", () => {
  const output = scaffold(
    `
type User {
  id: ID
  name: String!
  avatar: String!
  role: Role!
  interest: interest_enum!
}

enum Role {
	USER
	ADMIN
	AUTHOR
}

enum interest_enum {
	READING
	SPORTS
	COOKING
}

type Query {
  me: User
}
`,
    {
      roots: ["User"],
      namingConvention: "asis"
    }
  )
  expect(output).toMatchSnapshot()

  expect(findFile(output, "UserModel")).toBeTruthy()

  const roleEnumFile = findFile(output, "RoleEnum")
  expect(roleEnumFile).toBeTruthy()

  // TS type is plain Role
  expect(hasFileContentExact(roleEnumFile, "export enum Role {")).toBeTruthy()
  // MST model is +Enum
  expect(
    hasFileContentExact(
      roleEnumFile,
      'export const RoleEnumType = types.enumeration("Role"'
    )
  ).toBeTruthy()

  const interestEnumFile = findFile(output, "interest_enum")
  expect(interestEnumFile).toBeTruthy()
  // TS type is plain interest_enum
  expect(
    hasFileContentExact(interestEnumFile, "export enum interest_enum")
  ).toBeTruthy()
  // MST type is interest_enum (no extra Enum appended)
  expect(
    hasFileContentExact(
      interestEnumFile,
      'export const interest_enumType = types.enumeration("interest_enum"'
    )
  ).toBeTruthy()
})

test("enums ending in Enum doesn't have an extra Enum postfix with namingConvention=js", () => {
  const output = scaffold(
    `
type User {
  id: ID
  name: String!
  avatar: String!
  role: Role!
  interest: interest_enum!
}

enum Role {
	USER
	ADMIN
	AUTHOR
}

enum interest_enum {
	READING
	SPORTS
	COOKING
}

type Query {
  me: User
}
`,
    {
      roots: ["User"]
    }
  )
  expect(output).toMatchSnapshot()

  expect(findFile(output, "UserModel")).toBeTruthy()

  const roleEnumFile = findFile(output, "RoleEnum")
  expect(roleEnumFile).toBeTruthy()
  expect(hasFileContentExact(roleEnumFile, "export enum Role {")).toBeTruthy()
  expect(
    hasFileContentExact(
      roleEnumFile,
      'export const RoleEnumType = types.enumeration("Role"'
    )
  ).toBeTruthy()

  const interestEnumFile = findFile(output, "InterestEnum")
  console.log("interestEnumFile", interestEnumFile)
  expect(interestEnumFile).toBeTruthy()
  expect(
    hasFileContentExact(interestEnumFile, "export enum InterestEnum {")
  ).toBeTruthy()
  expect(
    hasFileContentExact(
      interestEnumFile,
      'export const InterestEnumType = types.enumeration("InterestEnum"'
    )
  ).toBeTruthy()
})

test("handle reserved graphql name", () => {
  try {
    const schema = `
        type Subscription {
          id: ID
          channel: String
        }
        
        type Query {
          subscription: Subscription
        }
      `
    scaffold(schema, { roots: ["Subscription"] })
  } catch (error) {
    expect(error.message).toMatch(
      "Cannot generate SubscriptionModel, Subscription is a graphql reserved name"
    )
  }
})

test("boolean return value", () => {
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
type Mutation {
  returnBoolean(toReturn: Boolean!): Boolean
}
`,
      {
        roots: ["User"],
        namingConvention: "asis"
      }
    )
  ).toMatchSnapshot()
})

test("scaffolding with scalar type", () => {
  const output = scaffold(
    `
type Query {
  helloWithString: String!
  helloWithType: HelloResult!
}

type HelloResult {
  result: String!
}
`,
    {
      namingConvention: "asis"
    }
  )

  expect(output).toMatchSnapshot()

  const rootStoreBase = findFile(output, "RootStore.base")
  expect(rootStoreBase).toBeTruthy()
  expect(
    hasFileContentRegexp(rootStoreBase, ".*HelloResultModelSelector.*")
  ).toBeTruthy()
  expect(
    hasFileContentRegexp(rootStoreBase, "import { .*HelloResultModelSelector }")
  ).toBeTruthy()

  // This should be generated for the query with scalar (String) return type
  expect(
    hasFileContentExact(
      rootStoreBase,
      "queryHelloWithString(variables?: {  }, options: QueryOptions = {}) {"
    )
  ).toBeTruthy()

  // This should be generated for the query with complex return type
  expect(
    hasFileContentExact(
      rootStoreBase,
      "queryHelloWithType(variables?: {  }, resultSelector: string | ((qb: HelloResultModelSelector) => HelloResultModelSelector) = helloResultModelPrimitives.toString(), options: QueryOptions = {})"
    )
  ).toBeTruthy()

  // Make sure no StringModelSelector is generated
  expect(
    hasFileContentRegexp(rootStoreBase, ".*StringModelSelector")
  ).toBeFalsy()
  expect(
    hasFileContentRegexp(rootStoreBase, "import { .*StringModelSelector }")
  ).toBeFalsy()
})
