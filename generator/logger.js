const c = require("ansi-colors")

const LOGGER = {
  info: (message) => {
    console.log(c.green(message))
  },
  debug: (message) => {
    if (!process.env.DEBUG || process.env.DEBUG === "false") return
    console.debug(c.blue(message))
  },
  warning: (message) => {
    console.warn(c.yellow(message))
  },
  error: (message) => {
    console.error(c.red(message))
  }
}

module.exports = {
  LOGGER
}
