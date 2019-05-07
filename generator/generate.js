const exampleAction = `  .actions(self => ({
    // this is just an auto-generated example action. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))`

function generate(types, format, generationDate) {
  const files = [] // [[name, contents]]
  const objectTypes = []

  let currentType = "<none>"

  generateTypes()
  generateRootStore()
  generateBarrelFile(files)

  function generateTypes() {
    types
      .filter(type => !type.name.startsWith("__"))
      .filter(type => type.kind !== "SCALAR")
      .forEach(type => {
        currentType = type.name
        console.log(`Generating type '${type.name}' (${type.kind})`)
        try {
          switch (type.kind) {
            case "OBJECT":
            case "INTERFACE":
              return handleObjectType(type)
            case "ENUM":
              return handleEnumType(type)
            default:
              throw new Error("Unhandled type: " + type.kind)
          }
        } finally {
          currentType = "<none>"
        }
      })
  }

  function handleEnumType(type) {
    const name = type.name

    const header = `\
/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"`

    const contents = `\
/**
 * ${name}${optPrefix("\n *\n * ", sanitizeComment(type.description))}
 */
const ${name} = types.enumeration("${name}", [
${type.enumValues
  .map(
    enumV =>
      `  "${enumV.name}",${optPrefix(
        " // ",
        sanitizeComment(enumV.description)
      )}`
  )
  .join("\n")}
])`

    const footer = `export { ${name} }`

    generateFile(name, [header, createSection("type-def", contents), footer])
  }

  function handleObjectType(type) {
    const name = type.name
    objectTypes.push(name)
    const imports = []

    const header = `\
/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"`

    const contents = `
/**
 * ${name}${optPrefix("\n *\n * ", sanitizeComment(type.description))}
 */
const ${name} = MSTGQLObject
  .named('${name}')
  .props({
${type.fields
  .filter(field => field.args.length === 0)
  .map(field => handleField(field, imports))
  .join("\n")}
  })`

    const typeImports =
      imports.length === 0
        ? ``
        : `import { ${unique(imports).join(", ")} } from "./index"`

    const footer = `export { ${name} }`

    generateFile(name, [
      header,
      createSection("type-imports", typeImports),
      createSection("type-def", contents),
      exampleAction,
      footer
    ])
  }

  function handleField(field, imports) {
    let r = ""
    if (field.description)
      r += `    /** ${sanitizeComment(field.description)} */\n`
    r += `    ${field.name}: ${handleFieldType(field.type, imports, true)},`
    return r
  }

  function handleFieldType(type, imports, isRoot) {
    switch (type.kind) {
      case "SCALAR":
        const primitiveType = primitiveToMstType(type.name)
        // a scalar as root, means it is optional!
        return !isRoot || primitiveType === "identifier"
          ? `types.${primitiveType}`
          : `types.optional(types.${primitiveType}, ${getMstDefaultValue(
              primitiveType
            )})`
      case "OBJECT":
        const isSelf = type.name === currentType
        const realType = isSelf
          ? `types.late(()${format === "ts" ? ": any" : ""} => ${type.name})`
          : type.name
        if (!isSelf) imports.push(type.name)
        return isRoot
          ? `types.maybe(types.reference(${realType}))`
          : `types.reference(${realType})`
      case "NON_NULL":
        return handleFieldType(type.ofType, imports, false)
      case "LIST":
        return `types.array(${handleFieldType(type.ofType, imports, false)})`
      default:
        throw new Error(
          `Failed to convert type ${JSON.stringify(type)}. PR Welcome!`
        )
    }
  }

  function generateRootStore() {
    const header = `\
/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLStore } from "mst-gql"`

    const typeImports =
      objectTypes.length === 0
        ? ``
        : `import { ${objectTypes.join(", ")} } from "./index"`

    const contents = `\
/**
 * Store, managing, among others, all the objects received through graphQL
 */
const RootStore = MSTGQLStore
  .named("RootStore")
  .props({
${objectTypes
  .map(t => `    ${t.toLowerCase()}s: types.optional(types.map(${t}), {})`) // TODO: optional should not be needed..
  .join(",\n")}
  })
`
    const footer = `export { RootStore }`

    generateFile("RootStore", [
      header,
      createSection("type-imports", typeImports),
      createSection("type-def", contents),
      exampleAction,
      footer
    ])
  }

  function generateBarrelFile() {
    generateFile("index", [
      createSection(
        "header",
        `/* mst-gql generated barrel file ${generationDate} */`
      ),
      createSection(
        "exports",
        files.map(f => `export * from "./${f[0]}"`).join("\n")
      )
    ])
  }

  /**
   * When generating a file, only sections created through createSection are re-generated when the target file exists
   */
  function generateFile(name, sections) {
    files.push([name, sections])
  }

  return files
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

function createSection(name, contents) {
  return [name, contents]
}

function sanitizeComment(comment) {
  // TODO: probably also need to escape //, /*, */ etc...
  return comment.replace(/\n/g, " ")
}

function optPrefix(prefix, thing) {
  if (!thing) return ""
  return prefix + thing
}

function unique(things) {
  return Array.from(new Set(things))
}

module.exports = { generate }
