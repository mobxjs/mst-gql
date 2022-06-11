const { resolve } = require("path")
const { cosmiconfigSync } = require("cosmiconfig")
const { LOGGER } = require("./logger")

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
  debug: false,
  disableLogColors: false
}

exports.getConfig = function getConfig() {
  try {
    const result = explorer.search()
    return result ? result.config : exports.defaultConfig
  } catch (e) {
    LOGGER.error(e.message)
    return exports.defaultConfig
  }
}

function parse_header_arg_string(header_arg = []) {
  return header_arg.reduce((headers, current) => {
    const split = current.split(":")
    headers[split[0].trim().toLowerCase()] = split[1].trim()
    return headers
  }, {})
}

exports.mergeConfigs = function mergeConfigs(args, config) {
  // convert config headers to lowercase to ensure we don't have duplicates w/ CLI args
  const config_headers = Object.entries(config.header || {}).map(([k, v]) => [
    k.toLowerCase(),
    v
  ])
  const headers = {
    ...Object.fromEntries(config_headers),
    ...parse_header_arg_string(args["--header"])
  }

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
    header: headers,
    useIdentifierNumber:
      !!args["--useIdentifierNumber"] || config.useIdentifierNumber,
    fieldOverrides: args["--fieldOverrides"]
      ? parseFieldOverrides(args["--fieldOverrides"])
      : config.fieldOverrides,
    dynamicArgs: !!args["--dynamicArgs"] || config.dynamicArgs,
    debug: !!args["--debug"] || config.debug,
    disableLogColors: !!args["--disableLogColors"] || config.disableLogColors
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
