#!/usr/bin/env node
const arg = require("arg")
const path = require("path")
const fs = require("fs")
const child_process = require("child_process")
const graphql = require("graphql")

const { generate } = require("./generate")

function main() {
  let args

  try {
    args = arg({
      "--format": String,
      "--outDir": String,
      "--roots": String,
      "--excludes": String
    })
  } catch (e) {
    console.error(
      "Usage: mstgql-scaffold --format=js|ts --outDir=src/models graphql-schema.json\n" +
        "Usage: mstgql-scaffold --format=js|ts --outDir=src/models http://host/graphql"
    )
    throw e
  }

  const format = args["--format"] || "js"
  const outDir = path.resolve(process.cwd(), args["--outDir"] || "src/models")
  const input = args._[0] || "graphql-schema.json"
  const roots = args["--roots"]
    ? args["--roots"].split(",").map(s => s.trim())
    : []
  const excludes = args["--excludes"]
    ? args["--excludes"].split(",").map(s => s.trim())
    : []

  console.log(
    path.basename(__filename) +
      " --format=" +
      format +
      " --outDir=" +
      outDir +
      " " +
      input
  )
  if (!/^(ts|js)$/.test(format)) {
    console.error("Invalid format parameter, expected 'js' or 'ts'")
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
    // fs.unlinkSync(tmpFile)
  } else if (input.endsWith(".json")) {
    json = JSON.parse(fs.readFileSync(input, "utf8"))
  } else if (input.endsWith(".graphql")) {
    // Tnx https://blog.apollographql.com/three-ways-to-represent-your-graphql-schema-a41f4175100d!
    const text = fs.readFileSync(input, "utf8")
    const schema = graphql.buildSchema(text)
    json = graphql.graphqlSync(schema, graphql.introspectionQuery).data
  } else {
    console.error(
      "Expected json, graphql or url as input parameter, got: " + input
    )
    process.exit(1)
  }

  const files = generate(
    json.__schema.types,
    format,
    roots,
    excludes,
    new Date().toUTCString()
  )
  files.forEach(([name, contents, force]) => {
    writeFile(name, contents, force, format, outDir)
  })
}

function writeFile(name, contents, force, format, outDir) {
  const fnName = path.resolve(outDir, name + "." + format)
  if (!fs.existsSync(fnName) || force) {
    console.log("Writing file " + fnName)
    fs.writeFileSync(fnName, contents)
  } else {
    console.log("Skipping file " + fnName)
  }
}

main()
