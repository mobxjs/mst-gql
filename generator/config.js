const { existsSync } = require("fs")
const { resolve } = require("path")
const cosmiconfig = require("cosmiconfig")

const explorer = cosmiconfig("mst-gql")

const defaultConfig = {
  excludes: [],
  mandatoryFields: [],
  force: false,
  format: "js",
  input: "graphql-schema.json",
  modelsOnly: false,
  outDir: "src/models",
  roots: [],
  noReact: false,
  namingConvention: "js" // supported option: "js", "asis"
}

exports.getConfig = function getConfig() {
  try {
    const result = explorer.searchSync()
    return result ? result.config : defaultConfig
  } catch (e) {
    console.error(e.message)
    return defaultConfig
  }
}

exports.mergeConfigs = function mergeConfigs(args, config) {
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
    mandatoryFields: args["--mandatoryFields"]
      ? args["--mandatoryFields"].split(",").map(s => s.trim())
      : config.mandatoryFields,
    modelsOnly: !!args["--modelsOnly"] || config.modelsOnly,
    forceAll: !!args["--force"] || config.force,
    noReact: !!args["--noReact"] || config.noReact,
    namingConvention: args["--dontRenameModels"]
      ? "asis"
      : config.namingConvention
  }
}
