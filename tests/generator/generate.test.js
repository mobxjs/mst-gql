const graphql = require("graphql")
const { generate } = require("../../generator/generate")

function scaffold(
  definition,
  options = {
    format: "ts",
    roots: [],
    excludes: [],
    modelsOnly: false
  }
) {
  const schema = graphql.buildSchema(definition)
  const res = graphql.graphqlSync(schema, graphql.introspectionQuery)
  if (res.data) json = res.data
  else
    throw new Error("graphql parse error:\n\n" + JSON.stringify(res, null, 2))
  return generate(
    json.__schema.types,
    options.format || "ts",
    options.roots || [],
    options.excludes || [],
    "<during unit test run>",
    options.modelsOnly || false
  )
}

test("basic scaffolding to work", () => {
  expect(
    scaffold(`
type User {
  id: ID
  name: String!
  avatar: String!
}
type Query {
  me: User
}
`)
  ).toMatchSnapshot()
})
