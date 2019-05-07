#!/usr/bin/env node
const arg = require("arg")
const path = require("path")
const fs = require("fs")

const generationDate = new Date().toUTCString()

let args, format, outDir, input

try {
  args = arg({
    "--format": String,
    "--outDir": String
  })
} catch (e) {
  console.error(
    "Usage: mstgql-scaffold --format=js|ts --outDir=src/models graphql-schema.json"
  )
  throw e
}

function main() {
  format = args["--format"] || "js"
  outDir = path.resolve(process.cwd(), args["--outDir"] || "src/models")
  input = path.resolve(process.cwd(), args._[0] || "graphql-schema.json")

  console.log(
    path.basename(__filename) +
      " --format=" +
      format +
      " --outDir=" +
      outDir +
      " " +
      input
  )
  if (!fs.existsSync(input)) {
    console.error("Input file not found: " + input)
    process.exit(1)
  } else if (!/^(ts|js)$/.test(format)) {
    console.error("Invalid format parameter, expected 'js' or 'ts'")
    process.exit(1)
  }
  if (!fs.existsSync(outDir) || !fs.lstatSync(outDir).isDirectory()) {
    console.error("outDir specified is not an existing directory")
    process.exit(1)
  }

  const json = JSON.parse(fs.readFileSync(input, "utf8"))
  const types = json.__schema.types
  const files = []

  types
    .filter(type => !type.name.startsWith("__"))
    .forEach(type => {
      switch (type.kind) {
        case "OBJECT":
        case "INTERFACE":
          return handleObjectType(outDir, format, type, files)
        case "ENUM":
          return handleEnumType(outDir, format, type, files)
        case "UNION":
          return handleUnionType(outDir, format, type, files)
      }
    })

  // TODO: generateRootStore()
  generateBarrelFile(files)
}

function handleObjectType(outDir, format, type, files) {
  const name = type.name
  files.push(name)
  const imports = []

  let contents = `\
/**
 * ${name}
 *
 * ${type.description.replace(/\n/g, "\n * ")}
 */`

  contents += `\nconst ${name} = MSTGQLObject\n  .named('${name}')\n  .props({\n`

  contents += type.fields
    .filter(field => field.args.length === 0)
    .map(field => handleField(field, imports, name))
    .join("\n")

  contents += "\n  })"

  let header = `\
/* This file is generated using ${path.basename(
    __filename
  )} ${generationDate} */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"`

  if (imports.length > 0)
    header += `\n\nimport { ${Array.from(new Set(imports)).join(
      ", "
    )} } from "./index"`

  footer = `export { ${name} }`

  writeFile(name, header, contents, footer, exampleAction)
}

function handleField(field, imports, self) {
  let r = ""
  if (field.description)
    r += `    /** ${field.description.replace(/\n/g, " ")} */\n`
  r += `    ${field.name}: ${handleFieldType(field.type, imports, true, self)},`
  return r
}

function handleFieldType(type, imports, root, self) {
  switch (type.kind) {
    case "SCALAR":
      const primitiveType = primitiveToMstType(type.name)
      // a scalar as root, means it is optional!
      return !root
        ? `types.${primitiveType}`
        : `types.optional(types.${primitiveType}, ${getMstDefaultValue(
            primitiveType
          )})`
    case "OBJECT":
      const isSelf = type.name === self
      const realType = isSelf
        ? `types.late(()${format === "ts" ? ": any" : ""} => ${type.name})`
        : type.name
      if (!isSelf) imports.push(type.name)
      return root
        ? `types.maybe(types.reference(${realType}))`
        : `types.reference(${realType})`
    case "NON_NULL":
      return handleFieldType(type.ofType, imports, false, self)
    case "LIST":
      return `types.array(${handleFieldType(
        type.ofType,
        imports,
        false,
        self
      )})`
    default:
      throw new Error(
        `Failed to convert type ${JSON.stringify(type)}. PR Welcome!`
      )
  }
}

function primitiveToMstType(type) {
  const res = {
    ID: "identifier",
    Int: "integer",
    String: "string",
    Float: "number",
    Boolean: "boolean"
  }
  if (!res[type]) throw new Error("Unknown primitive type: " + type)
  return res[type]
}

function getMstDefaultValue(type) {
  const res = {
    integer: 0,
    string: `''`,
    number: 0,
    boolean: false
  }
  if (res[type] === undefined)
    throw new Error("Type cannot be optional: " + type)
  return res[type]
}

function generateBarrelFile(files) {
  writeFile(
    "index",
    `/** mst-gql generated barrel file ${generationDate} */`,
    files.map(f => `export * from "./${f}"`).join("\n"),
    ""
  )
}

function writeFile(name, header, body, footer, sampleCode = "") {
  const fnName = path.resolve(outDir, name + "." + format)
  if (!fs.existsSync(fnName)) {
    console.log("Generating " + fnName)
    const all = [
      `/* #region mst-gql-header */`,
      header,
      `/* #endregion */\n\n/* #region mst-gql-body */`,
      body,
      `/* #endregion */\n${sampleCode}\n\n/* #region mst-gql-footer */`,
      footer,
      `/* #endregion */`
    ].join("\n")
    fs.writeFileSync(fnName, all)
  } else {
    console.log("Updating " + fnName)
    let contents = fs.readFileSync(fnName, "utf8")
    contents = replaceSection(contents, "header", header, fnName)
    contents = replaceSection(contents, "body", body, fnName)
    contents = replaceSection(contents, "footer", footer, fnName)
    fs.writeFileSync(fnName, contents)
  }
}

function replaceSection(contents, name, text, fnName) {
  const startString = `/* #region mst-gql-${name} */`
  const start = contents.indexOf(startString)
  if (start === -1)
    throw new Error(
      `Failed to update file: ${fnName}, couldn't find the start of region ${name}. Consider throwing the file away`
    )
  const endString = `/* #endregion */`
  const end = contents.indexOf(endString, start)
  if (end === -1)
    throw new Error(
      `Failed to update file: ${fnName}, couldn't find the end of region ${name}. Consider throwing the file away`
    )
  const tail = contents.substring(end - 1)
  const head = contents.substring(0, start + startString.length + 1)
  return head + text + tail
}

const exampleAction = `  .actions(self => ({
    // this is just an auto-generated example action. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))`

main()
