const { URL } = require("url")
const fs = require("node:fs/promises")
const fetch = require("node-fetch")
const { LOGGER } = require("./logger")

async function download_schema_json(endpoint, query, headers) {
  try {
    // construct an object to take advantage of built-in validation
    const url = new URL(endpoint)
    LOGGER.info(`Downloading schema from URL '${url}'`)

    const res = await fetch(url, {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: JSON.stringify({ query })
    })
    const { data, errors } = await res.json()

    // got errors, need to parse them and return a human-friendly message
    if (errors) {
      const readable_errors = errors.map(
        ({ message, extensions }) =>
          `- ${message} (${JSON.stringify(extensions)})\n`
      )
      crash_with_message(
        `GraphQL server has issues with introspection query:\n${readable_errors}`
      )
    }

    LOGGER.debug(`Introspection query data: ${JSON.stringify(data)}`)
    return data
  } catch (error) {
    crash_with_message(`Unable to connect to API endpoint: ${error}`)
  }
}

function crash_with_message(message, exit_code = 1) {
  LOGGER.error(message)
  process.exit(exit_code)
}

async function read_file_or_crash(file_path) {
  try {
    return await fs.readFile(file_path, "utf8")
  } catch (error) {
    crash_with_message(`Failed to read file '${file_path}': ${error.message}`)
  }
}

async function can_access_file(file_path) {
  try {
    await fs.access(file_path)
    return true
  } catch (error) {
    return false
  }
}

module.exports = {
  crash_with_message,
  download_schema_json,
  read_file_or_crash,
  can_access_file
}
