/// <reference types="jest"/>

const { mergeConfigs, defaultConfig } = require("../generator/config")

const testArgsWithoutHeader = {
  _: ["file_input"],
  "--format": undefined,
  "--outDir": undefined,
  "--roots": undefined,
  "--excludes": undefined,
  "--modelsOnly": undefined,
  "--force": undefined,
  "--noReact": undefined,
  "--separate": undefined,
  "--dontRenameModels": undefined,
  "--header": undefined
}

const testArgsWithHeader = {
  ...testArgsWithoutHeader,
  "--header": "X-Hasura-Admin-Secret:supersecret"
}

const configWithHeader = {
  input: "http://localhost:8080/v1/graphql",
  format: "ts",
  outDir: "src/models",
  roots: ["todos", "otherthings"],
  header: {
    "x-hasura-admin-secret": "supersecret"
  }
}

const testConfigMultipleHeaders = {
  ...configWithHeader,
  header: {
    "x-hasura-admin-secret": "supersecret",
    "x-hasura-role": "superuser"
  }
}

test("header is used when passed as argument", () => {
  const results = mergeConfigs(testArgsWithHeader, defaultConfig)

  expect(results.header).toBe(testArgsWithHeader["--header"])
})

test("header is used when passed as argument even if config is passed", () => {
  const results = mergeConfigs(testArgsWithHeader, configWithHeader)

  expect(results.header).toBe(testArgsWithHeader["--header"])
})

test("config is used for header", () => {
  const results = mergeConfigs(testArgsWithoutHeader, configWithHeader)

  expect(results.header).toBe("x-hasura-admin-secret:supersecret")
})

test("config is used for multiple headers", () => {
  const results = mergeConfigs(testArgsWithoutHeader, testConfigMultipleHeaders)

  expect(results.header).toBe(
    "x-hasura-admin-secret:supersecret --header=x-hasura-role:superuser"
  )
})
