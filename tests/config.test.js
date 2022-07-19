/// <reference types="jest"/>

const { mergeConfigs, defaultConfig } = require("../generator/config")

const defaultArgs = {
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
  "--header": undefined,
  "--help": undefined,
  "--debug": undefined
}

const argsWithHeader = {
  ...defaultArgs,
  "--header": ["X-Hasura-Admin-Secret:secret_from_args"]
}

const argsWithMultipleHeaders = {
  ...argsWithHeader,
  "--header": [
    "X-Hasura-Admin-Secret:secret_from_args",
    "X-Hasura-Role:superuser"
  ]
}

const configWithHeader = {
  ...defaultConfig,
  input: "http://localhost:8080/v1/graphql",
  format: "ts",
  outDir: "src/models",
  roots: ["todos", "otherthings"],
  header: {
    "x-hasura-admin-secret": "secret_from_config"
  }
}

const configWithMultipleHeaders = {
  ...configWithHeader,
  header: {
    "x-hasura-admin-secret": "secret_from_config",
    "x-hasura-role": "superuser"
  }
}

test("CLI supports a single usage of the --header argument", () => {
  const results = mergeConfigs(argsWithHeader, defaultConfig)

  expect(results.header).toStrictEqual({
    "x-hasura-admin-secret": "secret_from_args"
  })
})

test("CLI supports multiple usages of the --header argument", () => {
  const results = mergeConfigs(argsWithMultipleHeaders, defaultConfig)

  expect(results.header).toStrictEqual({
    "x-hasura-admin-secret": "secret_from_args",
    "x-hasura-role": "superuser"
  })
})

test("config supports specifying a single header", () => {
  const results = mergeConfigs(defaultArgs, configWithHeader)

  expect(results.header).toStrictEqual({
    "x-hasura-admin-secret": "secret_from_config"
  })
})

test("config supports specifying multiple headers", () => {
  const results = mergeConfigs(defaultArgs, configWithMultipleHeaders)

  expect(results.header).toStrictEqual({
    "x-hasura-admin-secret": "secret_from_config",
    "x-hasura-role": "superuser"
  })
})

test("the --header argument takes priority over the config file", () => {
  const results = mergeConfigs(argsWithHeader, configWithHeader)

  expect(results.header).toStrictEqual({
    "x-hasura-admin-secret": "secret_from_args"
  })
})

test("fieldOverrides outputs items with valid signature", () => {
  const fieldOverridesArgs = {
    "--fieldOverrides": "id:uuid:identifier, id:bigint:identifierNumber, *:Date:Date:../scalars"
  }
  const args = { ...defaultArgs, ...fieldOverridesArgs }
  const config = {
    input: "http://localhost:8080/v1/graphql",
    format: "ts",
    outDir: "src/models",
    roots: ["todos"]
  }

  const results = mergeConfigs(args, config)

  expect(results.fieldOverrides).toEqual([
    ["id", "uuid", "identifier"],
    ["id", "bigint", "identifierNumber"],
    ["*", "Date", "Date", "../scalars"],
  ])
})

test("throws with invalid fieldOverrides format", () => {
  const fieldOverridesArgs = { "--fieldOverrides": "id:uuid, newId" }
  const args = { ...defaultArgs, ...fieldOverridesArgs }
  const config = {
    input: "http://localhost:8080/v1/graphql",
    format: "ts",
    outDir: "src/models",
    roots: ["todos"]
  }

  expect(() => mergeConfigs(args, config)).toThrow(/invalid override/i)
})
