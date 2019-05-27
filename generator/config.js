const { existsSync } = require("fs");
const { resolve } = require("path");

const defaultConfig = {
  excludes: [],
  force: false,
  format: "js",
  input: "graphql-schema.json",
  modelsOnly: false,
  outDir: "src/models",
  roots: [],
}
''
exports.getConfig = function getConfig(configPath) {
  let configLocation
  if (configPath) {
    configLocation = resolve(process.cwd(), configPath)
  } else {
    if (existsSync(resolve(process.cwd(), 'mst-gql.config.json'))) {
      configLocation = resolve(process.cwd(), 'mst-gql.config.json')
    } else if (existsSync(resolve(process.cwd(), 'mst-gql.config.js'))) {
      configLocation = resolve(process.cwd(), 'mst-gql.config.js')
    } else {
      return defaultConfig;
    }
  }

  if (configLocation.endsWith('.json')) {
    return JSON.parse(readFileSync(configLocation, 'utf-8'));
  } else if (configLocation.endsWith('.js')) {
    return require(configLocation);
  }
  return defaultConfig;
}

exports.mergeConfigs = function mergeConfigs(args, config) {
  const format = args["--format"] || config.format
  const outDir = path.resolve(process.cwd(), args["--outDir"] || config.outDir)
  const input = args._[0] || config.input,
  const roots = args["--roots"]
    ? args["--roots"].split(",").map(s => s.trim())
    : config.roots
  const excludes = args["--excludes"]
    ? args["--excludes"].split(",").map(s => s.trim())
    : config.excludes
  const modelsOnly =!!args["--modelsOnly"] || config.modelsOnly
  const forceAll = !!args["--force"] || config.force
  return {
    format,
    outDir,
    input,
    roots,
    excludes,
    modelsOnly,
    forceAll
  }
}
