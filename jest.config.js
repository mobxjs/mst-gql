module.exports = {
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/examples/"],
  watchPathIgnorePatterns: ["/tests/lib/todos/models/"],
  moduleNameMapper: {
    "^mst-gql$": "<rootDir>/src/mst-gql.ts"
  }
}
