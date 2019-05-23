const exampleAction = `  .actions(self => ({
    // This is just an auto-generated example action, which can be safely thrown away. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))`

const buildInExcludes = [
  "Mutation",
  "CacheControlScope",
  "Query",
  "Subscription"
]

function generate(
  types,
  format = "js",
  rootTypes = [],
  excludes = [],
  generationDate = "a long long time ago...",
  modelsOnly = false
) {
  excludes.push(...buildInExcludes)

  const files = [] // [[name, contents]]
  const objectTypes = [] // all known OBJECT types for which MST classes are generated
  const knownTypes = [] // all known types (including enums and such)  for which MST classes are generated
  const toExport = [] // files to be exported from barrel file
  let currentType = "<none>"

  const header = `/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */${format === "ts" ? "\n/* tslint:disable */" : ""}`
  const importPostFix = format === "mjs" ? ".mjs" : ""

  inlineInterfaces(types)

  generateTypes()
  generateRootStore()
  if (!modelsOnly) {
    generateReactUtils()
  }
  generateBarrelFile(files)

  function generateTypes() {
    types
      .filter(type => !excludes.includes(type.name))
      .filter(type => !type.name.startsWith("__"))
      .filter(
        type =>
          type.kind !== "SCALAR" &&
          type.kind !== "INPUT_OBJECT" &&
          type.kind !== "INTERFACE"
      )
      .forEach(type => {
        knownTypes.push(type.name)
        if (type.kind === "OBJECT") objectTypes.push(type.name)
      })

    if (!rootTypes.length) {
      rootTypes = autoDetectRootTypes()
      console.warn(
        "Warning: no root types are configured. Probably --roots should be set. Detected the following objects to be possible root types: " +
          rootTypes.join(", ")
      )
    }

    rootTypes.forEach(type => {
      if (!objectTypes.includes(type))
        throw new Error(
          `The root type specified: '${type}' is unknown, excluded or not an OBJECT type!`
        )
    })

    types
      .filter(type => knownTypes.includes(type.name))
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

  function skipNonNull(type) {
    return type.kind === "NON_NULL" ? type.ofType : type
  }

  function autoDetectRootTypes() {
    return types
      .filter(
        type =>
          objectTypes.includes(type.name) &&
          type.fields.some(
            field =>
              field.name === "id" &&
              skipNonNull(field.type).kind === "SCALAR" &&
              skipNonNull(field.type).name === "ID"
          )
      )
      .map(t => t.name)
  }

  function handleEnumType(type) {
    const name = type.name
    toExport.push(name + "Enum")

    const contents = `\
${header}
import { types } from "mobx-state-tree"

/**
* ${name}${optPrefix("\n *\n * ", sanitizeComment(type.description))}
*/
export const ${name}Enum = ${handleEnumTypeCore(type)}
`

    generateFile(name + "Enum", contents, true)
  }

  function handleEnumTypeCore(type) {
    return `types.enumeration("${type.name}", [
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
  }

  function handleObjectType(type) {
    const name = type.name
    toExport.push(name + "Model")

    const imports = []
    let primitiveFields = []
    let nonPrimitiveFields = []
    let refs = []
    const flowerName = toFirstLower(name)

    const entryFile = `\
import { ${name}ModelBase } from "./${name}Model.base${importPostFix}"

${
  format === "ts"
    ? `/* The TypeScript type of an instance of ${name}Model */\nexport type ${name}ModelType = typeof ${name}Model.Type\n`
    : ""
}
${
  modelsOnly
    ? ""
    : `/* A graphql query fragment builders for ${name}Model */
export { selectFrom${name}, ${flowerName}ModelPrimitives, ${name}ModelSelector } from "./${name}Model.base${importPostFix}"`
}

/**
 * ${name}Model${optPrefix("\n *\n * ", sanitizeComment(type.description))}
 */
export const ${name}Model = ${name}ModelBase
${exampleAction}
`

    const fields = type.fields
      .filter(field => field.args.length === 0)
      .map(field => handleField(field, imports))
      .join("\n")

    const typeImports = unique(imports)
      .map(
        i =>
          // TODO: hacks! build better import system
          `import { ${i} } from "./${i}${importPostFix}"${
            modelsOnly || i === `${currentType}Model` // avoid importing self
              ? ""
              : `\nimport { ${i}Selector } from "./${i}.base${importPostFix}"`
          }`
      )
      .join("\n")

    const modelFile = `\
${header}

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"

${typeImports}
import { RootStore } from "./index${importPostFix}"

/**
 * ${name}Base
 * auto generated base class for the model ${name}Model.${optPrefix(
      "\n *\n * ",
      sanitizeComment(type.description)
    )}
 */
export const ${name}ModelBase = MSTGQLObject
  .named('${name}')
  .props({
    __typename: types.optional(types.literal("${name}"), "${name}"),
${fields}
  })
  .views(self => ({
    get store() {
      return self.__getStore${
        format === "ts" ? `<typeof RootStore.Type>` : ""
      }()
    }
  }))

${generateFragments()}
`

    generateFile(name + "Model.base", modelFile, true)
    generateFile(name + "Model", entryFile)

    function handleField(field) {
      let r = ""
      if (field.description)
        r += `    /** ${sanitizeComment(field.description)} */\n`
      r += `    ${field.name}: ${handleFieldType(
        field.name,
        skipNonNull(field.type),
        true
      )},`
      return r
    }

    function handleFieldType(fieldName, type, useMaybe) {
      switch (type.kind) {
        case "SCALAR":
          primitiveFields.push(fieldName)
          const primitiveType = primitiveToMstType(type.name)
          return wrap(
            `types.${primitiveType}`,
            useMaybe && primitiveType !== "identifier",
            "types.maybe(",
            ")"
          )
        case "OBJECT":
          return wrap(
            handleObjectFieldType(fieldName, type),
            useMaybe,
            "types.maybe(",
            ")"
          )
        case "LIST":
          return `types.optional(types.array(${handleFieldType(
            fieldName,
            skipNonNull(type.ofType),
            false // dont wrap contents in maybe
          )}), [])`
        case "ENUM":
          imports.push(type.name + "Enum")
          return wrap(`${type.name}Enum`, useMaybe, "types.maybe(", ")")
        default:
          throw new Error(
            `Failed to convert type ${JSON.stringify(type)}. PR Welcome!`
          )
      }
    }

    function handleObjectFieldType(fieldName, type) {
      nonPrimitiveFields.push([fieldName, type.name])
      const isSelf = type.name === currentType

      // this type is not going to be handled by mst-gql, store as frozen
      if (!knownTypes.includes(type.name)) return `types.frozen()`

      // import the type
      imports.push(type.name + "Model")

      // always using late prevents potential circular dependency issues between files
      const realType = `types.late(()${
        isSelf && format === "ts" ? ": any" : ""
      } => ${type.name}Model)`

      // this object is not a root type, so assume composition relationship
      if (!isSelf && !rootTypes.includes(type.name)) return realType

      // the target is a root type, store a reference
      refs.push([fieldName, type.name])
      return `MSTGQLRef(${realType})`
    }

    function generateFragments() {
      if (modelsOnly) return ""
      return `\
export class ${name}ModelSelector extends QueryBuilder {
${primitiveFields
  .map(p => `  get ${p}() { return this.__attr(\`${p}\`) }`)
  .join("\n")}
${nonPrimitiveFields
  .map(
    ([field, type]) =>
      `  ${field}(builder?: ${ifTS(
        `string | ((${toFirstLower(
          type
        )}: ${type}ModelSelector) => ${type}ModelSelector))`
      )} { return this.__child(\`${field}\`, ${type}ModelSelector, builder) }`
  )
  .join("\n")}
}

export function selectFrom${name}() {
  return new ${name}ModelSelector()
}

export const ${flowerName}ModelPrimitives = selectFrom${name}()${primitiveFields
        .map(p => `.${p}`)
        .join("")}.toString()
`
    }
  }

  function generateRootStore() {
    toExport.push("RootStore")

    const entryFile = `\
import { RootStoreBase } from "./RootStore.base${importPostFix}"

${
  format == "ts" ? "export type RootStoreType = typeof RootStore.Type\n\n" : ""
}\
export const RootStore = RootStoreBase
${exampleAction}
`

    const modelFile = `\
${header}
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin${
      format === "ts" ? ", QueryOptions" : ""
    } } from "mst-gql"
${
  objectTypes.length === 0
    ? ``
    : objectTypes
        .map(
          t =>
            `\n import { ${t}Model } from "./${t}Model${importPostFix}"${
              modelsOnly
                ? ""
                : `\n import { ${toFirstLower(
                    t
                  )}ModelPrimitives, ${t}ModelSelector } from "./${t}Model.base${importPostFix}"`
            }`
        )
        .join("")
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = ${modelsOnly ? "types.model()" : "MSTGQLStore"}
  .named("RootStore")
  .extend(configureStoreMixin([${objectTypes
    .map(s => `['${s}', () => ${s}Model]`)
    .join(", ")}], [${rootTypes.map(s => `'${s}'`).join(", ")}]))
  .props({
${rootTypes
  .map(
    t =>
      `    ${t.toLowerCase()}s: types.optional(types.map(types.late(() => ${t}Model)), {})`
  ) // optional should not be needed here..
  .join(",\n")}
  })
  .actions(self => ({${generateQueries()}    
  }))
`
    generateFile("RootStore", entryFile)
    generateFile("RootStore.base", modelFile, true)
  }

  function generateQueries() {
    if (modelsOnly) return ""
    return (
      generateQueryHelper(
        findObjectByName("Query"),
        "query",
        "query",
        format === "ts" ? ", options: QueryOptions = {}" : ", options = {}",
        ", options"
      ) +
      generateQueryHelper(
        findObjectByName("Mutation"),
        "mutation",
        "mutate",
        format === "ts"
          ? ", optimisticUpdate?: () => void"
          : ", optimisticUpdate",
        ", optimisticUpdate"
      ) +
      generateQueryHelper(
        findObjectByName("Subscription"),
        "subscription",
        "subscribe",
        format === "ts"
          ? `, onData?: (item: any) => void` /* TODO: fix the any */
          : `, onData`,
        ", onData"
      )
    )
  }

  function generateQueryHelper(
    query,
    gqlPrefix,
    methodPrefix,
    extraFormalArgs = "",
    extraActualArgs = ""
  ) {
    if (!query) return ""
    return query.fields
      .map(field => {
        let { name, args, type, description } = field

        if (type.kind === "NON_NULL") type = type.ofType
        const returnsList = type.kind === "LIST"
        let returnType = returnsList ? type.ofType : type
        if (returnType.kind === "NON_NULL") returnType = returnType.ofType

        if (returnType.kind === "OBJECT" && excludes.includes(returnType.name))
          return ""
        // TODO: probably we will need to support input object types soon
        if (returnType.kind !== "OBJECT") {
          console.warn(
            `Skipping generation of query '${name}', its return type is not yet understood. PR is welcome`
          )
          // log(returnType)
          return "" // TODO: for now, we only generate queries for those queries that return objects
        }

        const tsType =
          format !== "ts"
            ? ""
            : `<typeof ${returnType.name}Model.Type${returnsList ? "[]" : ""}>`

        const formalArgs =
          args.length === 0
            ? ""
            : "(" +
              args
                .map(arg => `\$${arg.name}: ${printGraphqlType(arg.type)}`)
                .join(", ") +
              ")"
        const actualArgs =
          args.length === 0
            ? ""
            : "(" +
              args.map(arg => `${arg.name}: \$${arg.name}`).join(", ") +
              ")"

        const tsVariablesType =
          format === "ts"
            ? `: { ${args
                .map(arg => `${arg.name}: ${printTsType(arg.type)}`)
                .join(", ")} }`
            : ""
        return `\
${optPrefix("\n    // ", sanitizeComment(description))}
    ${methodPrefix}${toFirstUpper(name)}(variables${
          args.length === 0 && format === "ts" ? "?" : ""
        }${tsVariablesType}, resultSelector${
          ifTS(
            `: string | ((qb: ${returnType.name}ModelSelector) => ${
              returnType.name
            }ModelSelector)`
          ) /* TODO or GQL object */
        } = ${toFirstLower(returnType.name)}ModelPrimitives${extraFormalArgs}) {
      return self.${methodPrefix}${tsType}(\`${gqlPrefix} ${name}${formalArgs} { ${name}${actualArgs} {
        \${typeof resultSelector === "function" ? resultSelector(new ${
          returnType.name
        }ModelSelector()).toString() : resultSelector}
      } }\`, variables${extraActualArgs})
    },`
      })
      .join("")
  }

  function printGraphqlType(type) {
    switch (type.kind) {
      case "NON_NULL":
        return printGraphqlType(type.ofType) + "!"
      case "LIST":
        return `[${printGraphqlType(type.ofType)}]`
      case "ENUM":
      case "OBJECT":
      case "INPUT_OBJECT":
      case "SCALAR":
        return type.name
      default:
        throw new Error(
          "Not implemented printGraphQLType yet, PR welcome for " +
            JSON.stringify(type, null, 2)
        )
    }
  }

  function printTsType(type, isRoot = true) {
    switch (type.kind) {
      case "NON_NULL":
        return printTsType(type.ofType, false)
      case "LIST":
        return `${printTsType(type.ofType, true)}[]`
      case "ENUM":
      case "OBJECT":
        return type.name + (isRoot ? " | undefined" : "")
      case "SCALAR":
        return printTsPrimitiveType(type.name) + (isRoot ? " | undefined" : "")
      default:
        throw new Error(
          "Not implemented printTsType yet, PR welcome for " +
            JSON.stringify(type, null, 2)
        )
    }
  }

  function printTsPrimitiveType(primitiveType) {
    const res = {
      ID: "string",
      Int: "number",
      String: "string",
      Float: "number",
      Boolean: "boolean"
    }
    // if (!res[type]) throw new Error("Unknown primitive type: " + type)
    return res[primitiveType] || "any"
  }

  function findObjectByName(name) {
    return types.find(type => type.name === name && type.kind === "OBJECT")
  }

  function generateReactUtils() {
    toExport.push("reactUtils")
    const contents = `\
${header}

import { createStoreContext, createQueryComponent, createUseQueryHook } from "mst-gql"
import { RootStore } from "./RootStore${importPostFix}"

export const StoreContext = createStoreContext${
      format === "ts" ? `<typeof RootStore.Type>` : ""
    }()

export const Query = createQueryComponent(StoreContext)

export const useQuery = createUseQueryHook(StoreContext)
`

    generateFile("reactUtils", contents, true)
  }

  function generateBarrelFile() {
    const contents = `\
${header}

${toExport.map(f => `export * from "./${f}${importPostFix}"`).join("\n")}
`
    generateFile("index", contents, true)
  }

  function generateFile(name, contents, force = false) {
    files.push([name, contents, force])
  }

  function ifTS(ifTSstr, notTSstr = "") {
    return format === "ts" ? ifTSstr : notTSstr
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
  // if (!res[type]) throw new Error("Unknown primitive type: " + type)
  return res[type] || "frozen()"
}

function getMstDefaultValue(type) {
  const res = {
    integer: "0",
    string: `''`,
    number: "0",
    boolean: "false",
    "frozen()": "undefined"
  }
  if (res[type] === undefined)
    throw new Error("Type cannot be optional: " + type)
  return res[type]
}

function inlineInterfaces(types) {
  // This function spreads all the fields defined in interfaces into the object definitions themselves
  const interfaces = new Map()
  types.forEach(t => {
    if (t.kind === "INTERFACE") interfaces.set(t.name, t)
  })
  types.forEach(t => {
    if (t.kind === "OBJECT") {
      t.interfaces.forEach(i =>
        interfaces.get(i.name).fields.forEach(interfaceField => {
          if (
            !t.fields.some(
              objectField => objectField.name === interfaceField.name
            )
          )
            t.fields.push(interfaceField)
        })
      )
    }
  })
}

function sanitizeComment(comment) {
  // TODO: probably also need to escape //, /*, */ etc...
  return comment ? comment.replace(/\n/g, " ") : ""
}

function optPrefix(prefix, thing) {
  if (!thing) return ""
  return prefix + thing
}

function unique(things) {
  return Array.from(new Set(things))
}

function toFirstLower(str) {
  return str[0].toLowerCase() + str.substr(1)
}

function toFirstUpper(str) {
  return str[0].toUpperCase() + str.substr(1)
}

function wrap(thing, condition, prefix = "", postfix = "") {
  return condition ? `${prefix}${thing}${postfix}` : thing
}

function log(thing) {
  console.log(JSON.stringify(thing, null, 2))
  return thing
}

module.exports = { generate }
