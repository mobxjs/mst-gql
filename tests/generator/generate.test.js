/// <reference types="jest"/>

const { scaffold } = require("../../generator/generate")

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
