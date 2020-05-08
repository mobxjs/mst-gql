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
  header: undefined
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
          .map(key => `${key}:${config.header[key]}`)
          .join(" --header=")
      : undefined

  return {
    format: args["--format"] || config.format,
    outDir: resolve(process.cwd(), args["--outDir"] || config.outDir),
    input: args._[0] || config.input,
    roots: args["--roots"]
      ? args["--roots"].split(",").map(s => s.trim())
      : config.roots,
    excludes: args["--excludes"]
      ? args["--excludes"].split(",").map(s => s.trim())
      : config.excludes,
    modelsOnly: !!args["--modelsOnly"] || config.modelsOnly,
    forceAll: !!args["--force"] || config.force,
    noReact: !!args["--noReact"] || config.noReact,
    namingConvention: args["--dontRenameModels"]
      ? "asis"
      : config.namingConvention,
    header: args["--header"] || headerConfigValues // if multiple headers are passed in config, chain them up to pass on to apollo cli
  }
}
