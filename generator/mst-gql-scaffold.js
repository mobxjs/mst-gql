#!/usr/bin/env node
const arg = require("arg")
const path = require("path")
const fs = require("node:fs/promises")
const graphql = require("graphql")
const { getIntrospectionQuery } = require("graphql")
const ansi_colors = require("ansi-colors")

const { getConfig, mergeConfigs } = require("./config")
const { generate, writeFiles, logUnexpectedFiles } = require("./generate")
const {
  crash_with_message,
  download_schema_json,
  read_file_or_crash,
  can_access_file
} = require("./utilities")
const { LOGGER } = require("./logger")

const definition = {
  "--format": String,
  "--outDir": String,
  "--roots": String,
  "--excludes": String,
  "--modelsOnly": Boolean,
  "--force": Boolean,
  "--noReact": Boolean,
  "--separate": Boolean,
  "--dontRenameModels": Boolean,
  "--header": [String],
  "--useIdentifierNumber": Boolean,
  "--fieldOverrides": String,
  "--dynamicArgs": Boolean,
  "--help": Boolean,
  "--debug": Boolean,
  "--disableLogColorsdisableLogColors": Boolean
}

const HELP_DIALOG = `
Example usage:
    mstgql-scaffold https://some-api.com/graphql
    mstgql-scaffold --format=js --outDir=src/models graphql-schema.json
    mstgql-scaffold --format=ts --outDir=src/models graphql-schema.graphql
    
Valid options: 
    ${Object.keys(definition).join(", ")}
`.trim()

async function main() {
  let args, config

  try {
    // disable colors early to prevent log messages slipping by before we can
    // check if the `disableLogColors` config option has been provided
    ansi_colors.enabled = false

    args = arg(definition)
    config = getConfig()
  } catch (e) {
    crash_with_message(`Error: ${e.message}\n\n${HELP_DIALOG}`)
  }

  if (args["--help"]) {
    crash_with_message(HELP_DIALOG, 0)
  }

  const {
    format,
    outDir,
    input,
    roots,
    excludes,
    modelsOnly,
    forceAll,
    noReact,
    namingConvention,
    header,
    useIdentifierNumber,
    fieldOverrides,
    dynamicArgs,
    debug,
    disableLogColors
  } = mergeConfigs(args, config)
  const separate = !!args["--separate"]

  ansi_colors.enabled = !disableLogColors

  if (debug) {
    process.env.DEBUG = debug
    LOGGER.debug("Debug mode enabled")
  }

  LOGGER.debug(
    path.basename(__filename) +
      " --format=" +
      format +
      " --outDir=" +
      outDir +
      " " +
      input
  )

  if (!/^(ts|js|mjs)$/.test(format)) {
    crash_with_message(
      "Invalid format parameter, expected 'js' or 'ts' or 'mjs'"
    )
  }
  const does_out_dir_exist = await can_access_file(outDir)
  if (!does_out_dir_exist) {
    await fs.mkdir(outDir, { recursive: true })
  }

  const json = await get_schema_json({ input, headers: header })

  LOGGER.debug(
    "Detected types: \n" +
      json.__schema.types.map((t) => `  - [${t.kind}] ${t.name}`).join("\n")
  )

  // LOGGER.info(JSON.stringify(json, null, 2))
  const files = generate(
    json.__schema,
    format,
    roots,
    excludes,
    new Date().toUTCString(),
    modelsOnly,
    noReact,
    namingConvention,
    useIdentifierNumber,
    fieldOverrides,
    dynamicArgs
  )
  await writeFiles(outDir, files, format, forceAll, true, separate)
  await logUnexpectedFiles(outDir, files)
}

// Three ways that
async function get_schema_json({ input, headers }) {
  if (input.endsWith(".json")) {
    try {
      return JSON.parse(await read_file_or_crash(input))
    } catch (error) {
      crash_with_message(
        `'${input}' did not contain a valid GraphQL schema: ${error.message}`
      )
    }
  } else if (input.endsWith(".graphql")) {
    // Tnx https://blog.apollographql.com/three-ways-to-represent-your-graphql-schema-a41f4175100d!
    const text = await read_file_or_crash(input)
    const schema = graphql.buildSchema(text)
    const res = await graphql.graphql({
      schema,
      source: getIntrospectionQuery()
    })

    if (!res.data)
      crash_with_message(
        `GraphQL parse error:\n\n${JSON.stringify(res, null, 2)}`
      )
    return res.data
  } else if (input.startsWith("http:") || input.startsWith("https:")) {
    return download_schema_json(input, getIntrospectionQuery(), headers)
  } else {
    crash_with_message(
      `Expected json, graphql or url as input parameter, got: ${input}`
    )
  }
}

main().catch(LOGGER.error)
