const exampleAction = `  .actions(self => ({
    // this is just an auto-generated example action. 
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
  generationDate = "a long long time ago..."
) {
  excludes.push(...buildInExcludes)

  const files = [] // [[name, contents]]
  const objectTypes = [] // all known OBJECT types for which MST classes are generated
  const knownTypes = [] // all known types (including enums and such)  for which MST classes are generated

  let currentType = "<none>"

  inlineInterfaces(types)

  generateTypes()
  generateRootStore()
  generateReactUtils()
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

    if (!rootTypes.size) {
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

  function autoDetectRootTypes() {
    return types
      .filter(
        type =>
          objectTypes.includes(type.name) &&
          type.fields.some(
            field =>
              (field.name === "id" &&
                field.type.kind === "SCALAR" &&
                field.type.name === "ID") ||
              (field.name === "id" &&
                field.type.kind === "NON_NULL" &&
                field.type.ofType.kind === "SCALAR" &&
                field.type.ofType.name === "ID")
          )
      )
      .map(t => t.name)
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
const ${name} = ${handleEnumTypeCore(type)}`

    const footer = `export { ${name} }`

    generateFile(name, [header, createSection("type-def", contents), footer])
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
    const imports = []

    let primitives = ["__typename"]
    let refs = []

    const header = `\
/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"`

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

    const typeImports = unique(imports)
      // .map(i => `import { ${i}, ${toFirstLower(i)}FieldsDeep } from "./${i}"`)
      .map(i => `import { ${i} } from "./${i}"`)
      .join("\n")

    const flowerName = toFirstLower(name)

    const fragments = generateFragments()

    const footer = `export { ${name} }`

    generateFile(name, [
      header,
      createSection("type-imports", typeImports),
      createSection("fragments", fragments),
      createSection("type-def", contents),
      exampleAction,
      footer
    ])

    function handleField(field) {
      let r = ""
      if (field.description)
        r += `    /** ${sanitizeComment(field.description)} */\n`
      r += `    ${field.name}: ${handleFieldType(
        field.name,
        field.type,
        true
      )},`
      return r
    }

    function handleFieldType(fieldName, type, isRoot) {
      switch (type.kind) {
        case "SCALAR":
          primitives.push(fieldName)
          const primitiveType = primitiveToMstType(type.name)
          // a scalar as root, means it is optional!
          return !isRoot || primitiveType === "identifier"
            ? `types.${primitiveType}` // TODO: everything needs to be optional to allow for partials?
            : `types.optional(types.${primitiveType}, ${getMstDefaultValue(
                primitiveType
              )})`
        case "OBJECT":
          return handleObjectFieldType(fieldName, type, isRoot)
        case "NON_NULL":
          return handleFieldType(fieldName, type.ofType, false)
        case "LIST":
          return `types.array(${handleFieldType(
            fieldName,
            type.ofType,
            false
          )})`
        case "ENUM":
          imports.push(type.name)
          return type.name
        default:
          throw new Error(
            `Failed to convert type ${JSON.stringify(type)}. PR Welcome!`
          )
      }
    }

    function handleObjectFieldType(fieldName, type, isRoot) {
      const isSelf = type.name === currentType

      // this type is not going to be handled by mst-gql, store as frozen
      if (!knownTypes.includes(type.name)) return `types.frozen()`

      // import the type
      if (!isSelf) imports.push(type.name)

      // always using late prevents potential circular dependency issues between files
      const realType = `types.late(()${
        isSelf && format === "ts" ? ": any" : ""
      } => ${type.name})`

      // this object is not a root type, so assume composition relationship
      if (!isSelf && !rootTypes.includes(type.name))
        return isRoot ? `types.maybe(${realType})` : realType

      // the target is a root type, store a reference
      refs.push([fieldName, type.name])
      return isRoot
        ? `types.maybe(MSTGQLRef(${realType}))`
        : `MSTGQLRef(${realType})`
    }

    function generateFragments() {
      let fragments = `\
export const ${flowerName}Primitives = \`
${primitives.join("\n")}
\`
`

      //       if (refs.length === 0) {
      //         fragments += `\
      // export const ${flowerName}FieldsShallow = ${flowerName}Primitives
      // export const ${flowerName}FieldsDeep = ${flowerName}Primitives`
      //       } else {
      //         fragments += `\
      // export const ${flowerName}FieldsShallow = ${flowerName}Primitives + \`
      // ${refs.map(([fname]) => `${fname} { id __typename }`).join("\n")}
      // \`

      // export const ${flowerName}FieldsDeep = ${flowerName}Primitives + \`
      // ${refs
      //   .map(
      //     ([fname, type]) =>
      //       `${fname} { id, __typename` +
      //       (type === name ? `}` : ` \${${toFirstLower(type)}FieldsDeep} }`)
      //   )
      //   .join("\n")}
      // \``
      //       }
      return fragments
    }
  }

  function generateRootStore() {
    const header = `\
/* This is a mst-sql generated file */`
    const typeImports =
      `\
import { types } from "mobx-state-tree"
import { MSTGQLStore, typeInfo${
        format === "ts" ? ", QueryOptions" : ""
      } } from "mst-gql"` +
      (objectTypes.length === 0
        ? ``
        : `\nimport { ${objectTypes
            .map(t => `${t}, ${toFirstLower(t)}Primitives`)
            .join(", ")} } from "./index"`)

    const contents = `\
/**
* Store, managing, among others, all the objects received through graphQL
*/
const RootStore = MSTGQLStore
  .named("RootStore")
  .extend(typeInfo([${objectTypes
    .map(s => `['${s}', ${s}]`)
    .join(", ")}], [${rootTypes.map(s => `'${s}'`).join(", ")}]))
  .props({
${rootTypes
  .map(t => `    ${t.toLowerCase()}s: types.optional(types.map(${t}), {})`) // TODO: optional should not be needed..
  .join(",\n")}
  })
  .actions(self => ({${generateQueries()}    
  }))
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

  function generateQueries() {
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
          : ", optimisticUpdate?",
        ", optimisticUpdate"
      ) +
      generateQueryHelper(
        findObjectByName("Subscription"),
        "subscription",
        "subscribe"
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
        const { name, args, type, description } = field
        const returnsList = type.kind === "LIST"
        const returnType = returnsList ? type.ofType : type
        if (returnType.kind !== "OBJECT") {
          return "" // TODO: for now, we only generate queries for those queries that return objects
        }

        const tsType =
          format !== "ts"
            ? ""
            : `<typeof ${returnType.name}.Type${returnsList ? "[]" : ""}>`

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

        // TODO: the variables argument should could be strongly typed if TS
        const tsVariablesType = format === "ts" ? ": any" : ""
        return `\
${optPrefix("\n    // ", sanitizeComment(description))}
    ${methodPrefix}${toFirstUpper(
          name
        )}(variables${tsVariablesType} = {}, resultSelector = ${toFirstLower(
          returnType.name
        )}Primitives${extraFormalArgs}) {
      return self.${methodPrefix}${tsType}(\`${gqlPrefix} ${name}${formalArgs} { ${name}${actualArgs} {
        \${resultSelector}
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
      case "SCALAR":
        return type.name
      default:
        throw new Error(
          "Not implemented printGraphQLType yet, PR welcome for " +
            JSON.stringify(type, null, 2)
        )
    }
  }

  function findObjectByName(name) {
    return types.find(type => type.name === name && type.kind === "OBJECT")
  }

  function generateReactUtils() {
    const header = `\
/* This is a mst-sql generated file */
import { createStoreContext, createQueryComponent } from "mst-gql"
import { RootStore } from "./RootStore"`

    const body = `
export const StoreContext = createStoreContext${
      format === "ts" ? `<typeof RootStore.Type>` : ""
    }()

export const Query = createQueryComponent(StoreContext)
`

    generateFile("reactUtils", [
      createSection("header", header),
      createSection("body", body)
    ])
  }

  function generateBarrelFile() {
    generateFile("index", [
      createSection("header", `/* mst-gql generated barrel file*/`),
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

function createSection(name, contents) {
  return [name, contents]
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

function log(thing) {
  console.log(JSON.stringify(thing, null, 2))
  return thing
}

module.exports = { generate }
