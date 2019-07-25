const { existsSync } = require("fs");
const { resolve } = require("path");
const cosmiconfig = require('cosmiconfig');

const explorer = cosmiconfig('mst-gql');

const defaultConfig = {
  excludes: [],
  force: false,
  format: "js",
  input: "graphql-schema.json",
  modelsOnly: false,
  outDir: "src/models",
  roots: [],
  noReact: false,
}

exports.getConfig = function getConfig() {
  try {
    const result = explorer.searchSync();
    return result ? result.config : defaultConfig;
  } catch (e) {
    console.error(e.message);
    return defaultConfig;
  }
}

exports.mergeConfigs = function mergeConfigs(args, config) {
  const format = args["--format"] || config.format
  const outDir = resolve(process.cwd(), args["--outDir"] || config.outDir)
  const input = args._[0] || config.input
  const roots = args["--roots"]
    ? args["--roots"].split(",").map(s => s.trim())
    : config.roots
  const excludes = args["--excludes"]
    ? args["--excludes"].split(",").map(s => s.trim())
    : config.excludes
  const modelsOnly =!!args["--modelsOnly"] || config.modelsOnly
  const forceAll = !!args["--force"] || config.force
  const noReact = !!args["--noReact"] || config.noReact

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
