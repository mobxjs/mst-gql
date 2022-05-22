const { existsSync } = require("fs")
const { resolve } = require("path")
const { cosmiconfigSync } = require("cosmiconfig")

const explorer = cosmiconfigSync("mst-gql")

exports.defaultConfig = {
  excludes: [],
  force: false,
  format: "js",
  input: "graphql-schema.json",
  modelsOnly: false,
  outDir: "src/models",
  roots: [],
  noReact: false,
  namingConvention: "js", // supported option: "js", "asis",
  header: undefined,
  useIdentifierNumber: false,
  fieldOverrides: [],
  dynamicArgs: false,
  customScalars: []
}

exports.getConfig = function getConfig() {
  try {
    const result = explorer.search()
    return result ? result.config : exports.defaultConfig
  } catch (e) {
    console.error(e.message)
    return exports.defaultConfig
  }
}

exports.mergeConfigs = function mergeConfigs(args, config) {
  const headerConfigValues =
    config && config.header
      ? Object.keys(config.header)
          .map((key) => `${key}:${config.header[key]}`)
          .join(" --header=")
      : undefined

  return {
    format: args["--format"] || config.format,
    outDir: resolve(process.cwd(), args["--outDir"] || config.outDir),
    input: args._[0] || config.input,
    roots: args["--roots"]
      ? args["--roots"].split(",").map((s) => s.trim())
      : config.roots,
    excludes: args["--excludes"]
      ? args["--excludes"].split(",").map((s) => s.trim())
      : config.excludes,
    modelsOnly: !!args["--modelsOnly"] || config.modelsOnly,
    forceAll: !!args["--force"] || config.force,
    noReact: !!args["--noReact"] || config.noReact,
    namingConvention: args["--dontRenameModels"]
      ? "asis"
      : config.namingConvention,
    header: args["--header"] || headerConfigValues, // if multiple headers are passed in config, chain them up to pass on to apollo cli
    useIdentifierNumber:
      !!args["--useIdentifierNumber"] || config.useIdentifierNumber,
    fieldOverrides: args["--fieldOverrides"]
      ? parseFieldOverrides(args["--fieldOverrides"])
      : config.fieldOverrides,
    dynamicArgs: !!args["--dynamicArgs"] || config.dynamicArgs,
    customScalars: args["--customScalars"]
      ? parseCustomScalars(args["--customScalars"])
      : config.customScalars
  }
}

const parseFieldOverrides = (fieldOverrides) => {
  return fieldOverrides
    .split(",")
    .map((s) => s.trim())
    .map((item) => {
      const override = item.split(":").map((s) => s.trim())

      if (override.length !== 3)
        throw new Error("--fieldOverrides used with invalid override: " + item)

      return override
    })
}

const parseCustomScalars = (fieldOverrides) => {
  return fieldOverrides
    .split(",")
    .map((s) => s.trim())
    .map((item) => {
      const override = item.split(":").map((s) => s.trim())

      if (override.length !== 2)
        throw new Error("--customScalar used with invalid scalar: " + item)

      return override
    })
}
