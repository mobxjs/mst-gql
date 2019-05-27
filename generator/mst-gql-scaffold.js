#!/usr/bin/env node
const arg = require("arg")
const path = require("path")
const fs = require("fs")
const child_process = require("child_process")
const graphql = require("graphql")

const { getConfig } = require('./config');
const { generate, writeFiles } = require("./generate")

const definition = {
  "--format": String,
  "--outDir": String,
  "--roots": String,
  "--excludes": String,
  "--modelsOnly": Boolean,
  "--force": Boolean
}

function main() {
  let args, config

  try {
    args = arg(definition)
    config = getConfig();
  } catch (e) {
    console.error(
      "Example usage: mstgql-scaffold --format=js|ts --outDir=src/models graphql-schema.json\n, valid options: " +
        Object.keys(definition).join(", ")
    )
    throw e
  }

  const format = config.format || args["--format"] || "js"
  const outDir = path.resolve(process.cwd(), config.outDir || args["--outDir"] || "src/models")
  const input = config.input || args._[0] || "graphql-schema.json"
  const roots = config.roots || (args["--roots"]
    ? args["--roots"].split(",").map(s => s.trim())
    : [])
  const excludes = config.excludes || (args["--excludes"]
    ? args["--excludes"].split(",").map(s => s.trim())
    : [])
  const modelsOnly = config.modelsOnly || !!args["--modelsOnly"]
  const forceAll = config.force || !!args["--force"]

  console.log(
    path.basename(__filename) +
      " --format=" +
      format +
      " --outDir=" +
      outDir +
      " " +
      input
  )
  if (!/^(ts|js|mjs)$/.test(format)) {
    console.error("Invalid format parameter, expected 'js' or 'ts' or 'mjs'")
    process.exit(1)
  }
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  let json
  if (input.startsWith("http:") || input.startsWith("https:")) {
    const tmpFile = "tmp_schema.json"
    child_process.execSync(
      `${__dirname}/../node_modules/.bin/apollo schema:download --endpoint=${input} ${tmpFile}`
    )
    json = JSON.parse(fs.readFileSync(tmpFile, "utf8"))
    fs.unlinkSync(tmpFile)
  } else if (input.endsWith(".json")) {
    json = JSON.parse(fs.readFileSync(input, "utf8"))
  } else if (input.endsWith(".graphql")) {
    // Tnx https://blog.apollographql.com/three-ways-to-represent-your-graphql-schema-a41f4175100d!
    const text = fs.readFileSync(input, "utf8")
    const schema = graphql.buildSchema(text)
    const res = graphql.graphqlSync(schema, graphql.introspectionQuery)
    if (res.data) json = res.data
    else {
      console.error("graphql parse error:\n\n" + JSON.stringify(res, null, 2))
      process.exit(1)
    }
  } else {
    console.error(
      "Expected json, graphql or url as input parameter, got: " + input
    )
    process.exit(1)
  }

  console.log(
    "Detected types: \n" +
      json.__schema.types.map(t => `  - [${t.kind}] ${t.name}`).join("\n")
  )

  // console.log(JSON.stringify(json, null, 2))
  const files = generate(
    json.__schema.types,
    format,
    roots,
    excludes,
    new Date().toUTCString(),
    modelsOnly
  )
  writeFiles(outDir, files, format, forceAll, true)
}

main()
