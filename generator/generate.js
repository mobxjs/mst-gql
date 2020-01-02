const path = require("path")
const fs = require("fs")
const graphql = require("graphql")
const camelcase = require("camelcase")
const pluralize = require("pluralize")

const exampleAction = `  .actions(self => ({
    // This is an auto-generated example action.
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
  modelsOnly = false,
  noReact = false,
  namingConvention = "asis"
) {
  excludes.push(...buildInExcludes)

  // For each type converts 'name' according to namingConvention and copies
  // original name to the 'origName' field of the type's object
  transformTypes(types, namingConvention)

  const files = [] // [[name, contents]]
  const objectTypes = [] // all known OBJECT types for which MST classes are generated
  const origObjectTypes = [] // all known OBJECT types for which MST classes are generated
  const inputTypes = [] // all known INPUT_OBJECT types for which MST classes are generated
  const knownTypes = [] // all known types (including enums and such) for which MST classes are generated
  const enumTypes = [] // enum types to be imported when using typescript
  const toExport = [] // files to be exported from barrel file
  let currentType = "<none>"
  let origRootTypes = []

  const header = `/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */${format === "ts" ? "\n/* tslint:disable */" : ""}`
  const importPostFix = format === "mjs" ? ".mjs" : ""

  const interfaceAndUnionTypes = resolveInterfaceAndUnionTypes(types)

  generateModelBase()
  generateTypes()
  generateRootStore()
  if (!modelsOnly && !noReact) {
    generateReactUtils()
  }
  generateBarrelFile(files)

  function generateModelBase() {
    const entryFile = `\
import { MSTGQLObject } from "mst-gql"

export const ModelBase = MSTGQLObject
`
    generateFile("ModelBase", entryFile)
  }

  function generateTypes() {
    types
      .filter(type => !excludes.includes(type.name))
      .filter(type => !type.name.startsWith("__"))
      .filter(type => type.kind !== "SCALAR")
      .forEach(type => {
        knownTypes.push(type.name)
        if (type.kind === "OBJECT") {
          origObjectTypes.push(type.origName)
          objectTypes.push(type.name)
        } else if (type.kind === "INPUT_OBJECT") inputTypes.push(type)
      })

    if (!rootTypes.length) {
      rootTypes = autoDetectRootTypes()
      console.warn(
        "Warning: no root types are configured. Probably --roots should be set. Auto-detected and using the following types as root types: " +
          rootTypes.join(", ")
      )
    }

    rootTypes.forEach(type => {
      if (!origObjectTypes.includes(type))
        throw new Error(
          `The root type specified: '${type}' is unknown, excluded or not an OBJECT type!`
        )
    })

    // Keep the orig type names for mixin configuration
    origRootTypes = [...rootTypes]
    rootTypes = rootTypes.map(t => transformTypeName(t, namingConvention))

    console.log("rootTypes", JSON.stringify(rootTypes, null, 2))

    types
      .filter(type => knownTypes.includes(type.name))
      .forEach(type => {
        currentType = type.name
        // console.log(`Generating type '${type.name}' (${type.kind})`)
        try {
          switch (type.kind) {
            case "OBJECT":
              return handleObjectType(type)
            case "ENUM":
              return handleEnumType(type)
            case "INTERFACE":
            case "UNION":
              return handleInterfaceOrUnionType(type)
            case "INPUT_OBJECT":
              return
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
      .map(t => t.origName)
  }

  function handleEnumType(type) {
    const name = type.name
    toExport.push(name + "Enum")

    const tsType =
      format === "ts"
        ? `\
/**
 * Typescript enum
 */

export enum ${name} {
  ${type.enumValues.map(enumV => `${enumV.name}="${enumV.name}"`).join(",\n")}
}`
        : ""

    const contents = `\
${header}
import { types } from "mobx-state-tree"

${tsType}

/**
* ${name}${optPrefix("\n *\n * ", sanitizeComment(type.description))}
*/
export const ${name}Enum = ${handleEnumTypeCore(type)}
`
    if (format === "ts") {
      enumTypes.push(type.name)
    }
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
    const {
      primitiveFields,
      nonPrimitiveFields,
      imports,
      modelProperties,
      refs
    } = resolveFieldsAndImports(type)

    const { name, origName } = type
    const flowerName = toFirstLower(name)

    const entryFile = `${ifTS('import { Instance } from "mobx-state-tree"\n')}\
import { ${name}ModelBase } from "./${name}Model.base${importPostFix}"

${
  format === "ts"
    ? `/* The TypeScript type of an instance of ${name}Model */\nexport interface ${name}ModelType extends Instance<typeof ${name}Model.Type> {}\n`
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

    if (format === "ts") {
      addImportToMap(imports, name + "Model.base", "index", "RootStoreType")
    }

    const useTypedRefs = refs.length > 0 && format === "ts"
    const hasNestedRefs = refs.some(([, , isNested]) => isNested)

    const modelFile = `\
${header}

${
  useTypedRefs && hasNestedRefs
    ? `import { IObservableArray } from "mobx"\n`
    : ""
}\
import { types } from "mobx-state-tree"
import {${refs.length > 0 ? " MSTGQLRef," : ""} QueryBuilder${
      useTypedRefs ? ", withTypedRefs" : ""
    } } from "mst-gql"
import { ModelBase } from "./ModelBase${importPostFix}"
${printRelativeImports(imports)}
${
  useTypedRefs
    ? `/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
${refs
  .map(([fieldName, fieldTypeName, isNested]) =>
    isNested
      ? `  ${fieldName}: IObservableArray<${fieldTypeName}ModelType>;`
      : `  ${fieldName}: ${fieldTypeName}ModelType;`
  )
  .join("\n")}
}\n
`
    : ""
}\
/**
 * ${name}Base
 * auto generated base class for the model ${name}Model.${optPrefix(
      "\n *\n * ",
      sanitizeComment(type.description)
    )}
 */
export const ${name}ModelBase = ${
      useTypedRefs ? `withTypedRefs<Refs>()(` : ""
    }ModelBase
  .named('${name}')
  .props({
    __typename: types.optional(types.literal("${origName}"), "${origName}"),
${modelProperties}
  })
  .views(self => ({
    get store() {
      return self.__getStore${format === "ts" ? `<RootStoreType>` : ""}()
    }
  }))${useTypedRefs ? ")" : ""}

${generateFragments(name, primitiveFields, nonPrimitiveFields)}
`

    toExport.push(name + "Model")
    generateFile(name + "Model.base", modelFile, true)
    generateFile(name + "Model", entryFile)
  }

  function handleInterfaceOrUnionType(type) {
    // Only a model selector will be generated, not a mst model
    // That is, interface/unions don't have a mst model
    if (modelsOnly) return

    const interfaceOrUnionType = interfaceAndUnionTypes.get(type.name)
    const isUnion =
      interfaceOrUnionType && interfaceOrUnionType.kind === "UNION"
    const fileName = type.name + "ModelSelector"
    const {
      primitiveFields,
      nonPrimitiveFields,
      imports
    } = resolveFieldsAndImports(type, fileName)

    interfaceOrUnionType &&
      interfaceOrUnionType.ofTypes.forEach(t => {
        const toBeImported = [`${t.name}ModelSelector`]
        if (isUnion) toBeImported.push(`${toFirstLower(t.name)}ModelPrimitives`)
        addImportToMap(
          imports,
          fileName,
          `${t.name}Model.base`,
          ...toBeImported
        )
      })

    let contents = header + "\n\n"
    contents += 'import { QueryBuilder } from "mst-gql"\n'
    contents += printRelativeImports(imports)
    contents += generateFragments(
      type.name,
      primitiveFields,
      nonPrimitiveFields,
      interfaceOrUnionType
    )

    toExport.push(fileName)
    generateFile(fileName, contents, true)
  }

  function resolveFieldsAndImports(
    type,
    currentModuleName = `${currentType}Model.base`
  ) {
    const imports = new Map()
    const addImport = (moduleName, ...toBeImported) =>
      addImportToMap(imports, currentModuleName, moduleName, ...toBeImported)
    const primitiveFields = []
    const nonPrimitiveFields = []
    const refs = []

    let modelProperties = ""
    if (type.fields) {
      modelProperties = type.fields.map(field => handleField(field)).join("\n")
    }

    return {
      primitiveFields,
      nonPrimitiveFields,
      imports,
      modelProperties,
      refs
    }

    function handleField(field) {
      let r = ""
      if (field.description)
        r += `    /** ${sanitizeComment(field.description)} */\n`
      r += `    ${field.name}: ${handleFieldType(field.name, field.type)},`
      return r
    }

    function handleFieldType(fieldName, fieldType, isNested = false) {
      let isNullable = true
      if (fieldType.kind === "NON_NULL") {
        fieldType = fieldType.ofType
        isNullable = false
      }
      function result(thing, isRequired = false) {
        const canBeUndef = !isRequired && !isNested
        const canBeNull = !isRequired && isNullable
        return canBeNull || canBeUndef
          ? `types.union(${canBeUndef ? "types.undefined, " : ""}${
              canBeNull ? "types.null, " : ""
            }${thing})`
          : thing
      }
      switch (fieldType.kind) {
        case "SCALAR":
          primitiveFields.push(fieldName)
          const primitiveType = primitiveToMstType(fieldType.name)
          return result(
            `types.${primitiveType}`,
            primitiveType === "identifier"
          )
        case "OBJECT":
          return result(handleObjectFieldType(fieldName, fieldType, isNested))
        case "LIST":
          return result(
            `types.array(${handleFieldType(fieldName, fieldType.ofType, true)})`
          )
        case "ENUM":
          primitiveFields.push(fieldName)
          const enumType = fieldType.name + "Enum"
          if (type.kind !== "UNION" && type.kind !== "INTERFACE") {
            // TODO: import again when enums in query builders are supported
            addImport(enumType, enumType)
          }
          return result(enumType)
        case "INTERFACE":
        case "UNION":
          return result(handleInterfaceOrUnionFieldType(fieldName, fieldType))
        default:
          throw new Error(
            `Failed to convert type ${JSON.stringify(fieldType)}. PR Welcome!`
          )
      }
    }

    function handleObjectFieldType(fieldName, fieldType, isNested) {
      nonPrimitiveFields.push([fieldName, fieldType.name])
      const isSelf = fieldType.name === currentType

      // this type is not going to be handled by mst-gql, store as frozen
      if (!knownTypes.includes(fieldType.name)) return `types.frozen()`
      // import the type
      const modelType = fieldType.name + "Model"
      addImport(modelType, modelType)
      if (format === "ts") {
        addImport(modelType, `${modelType}Type`)
      }
      if (!modelsOnly) {
        addImport(`${modelType}.base`, `${modelType}Selector`)
      }

      // always using late prevents potential circular dependency issues between files
      const realType = `types.late(()${format === "ts" ? ": any" : ""} => ${
        fieldType.name
      }Model)`

      // this object is not a root type, so assume composition relationship
      if (!isSelf && !rootTypes.includes(fieldType.name)) return realType

      // the target is a root type, store a reference
      refs.push([fieldName, fieldType.name, isNested])
      return `MSTGQLRef(${realType})`
    }

    function handleInterfaceOrUnionFieldType(fieldName, fieldType) {
      nonPrimitiveFields.push([fieldName, fieldType.name])

      // import the type
      const className = `${fieldType.name}ModelSelector`
      addImport(className, className)

      const interfaceOrUnionType = interfaceAndUnionTypes.get(fieldType.name)
      const mstUnionArgs = interfaceOrUnionType.ofTypes.map(t => {
        // Note that members of a union type need to be concrete object types;
        // you can't create a union type out of interfaces or other unions.
        const subTypeClassName = t.name + "Model"
        if (type.kind !== "INTERFACE" && type.kind !== "UNION") {
          // TODO: split field type resolvement from model properties output
          addImport(subTypeClassName, subTypeClassName)
        }
        const isSelf = fieldType.name === currentType
        // always using late prevents potential circular dependency issues between files
        return `types.late(()${
          isSelf && format === "ts" ? ": any" : ""
        } => ${subTypeClassName})`
      })
      return `types.union(${mstUnionArgs.join(", ")})`
    }
  }

  function generateFragments(
    name,
    primitiveFields,
    nonPrimitiveFields,
    interfaceOrUnionType = null
  ) {
    if (modelsOnly) return ""

    let output = `export class ${name}ModelSelector extends QueryBuilder {\n`
    output += primitiveFields
      .map(p => `  get ${p}() { return this.__attr(\`${p}\`) }`)
      .join("\n")
    output += primitiveFields.length > 0 ? "\n" : ""
    output += nonPrimitiveFields
      .map(([field, fieldName]) => {
        const selector = `${fieldName}ModelSelector`
        let p = `  ${field}(builder`
        p += ifTS(
          `?: string | ${selector} | ((selector: ${selector}) => ${selector})`
        )
        p += `) { return this.__child(\`${field}\`, ${selector}, builder) }`
        return p
      })
      .join("\n")
    output += nonPrimitiveFields.length > 0 ? "\n" : ""

    if (interfaceOrUnionType) {
      output += interfaceOrUnionType.ofTypes
        .map(subType => {
          const selector = `${subType.name}ModelSelector`
          let p = `  ${toFirstLower(subType.name)}(builder`
          p += ifTS(
            `?: string | ${selector} | ((selector: ${selector}) => ${selector})`
          )
          p += `) { return this.__inlineFragment(\`${subType.name}\`, ${selector}, builder) }`
          return p
        })
        .join("\n")
      output += interfaceOrUnionType.ofTypes.length > 0 ? "\n" : ""
    }
    output += "}\n"

    output += `export function selectFrom${name}() {\n`
    output += `  return new ${name}ModelSelector()\n`
    output += "}\n\n"

    const flowername = toFirstLower(name)
    const modelPrimitives = `export const ${flowername}ModelPrimitives = selectFrom${name}()`

    if (interfaceOrUnionType && interfaceOrUnionType.kind === "UNION") {
      // for unions, select all primitive fields of member types
      output +=
        "// provides all primitive fields of union member types combined together\n"
      output += modelPrimitives
      output += interfaceOrUnionType.ofTypes
        .map(
          memberType =>
            `.${toFirstLower(memberType.name)}(${toFirstLower(
              memberType.name
            )}ModelPrimitives)`
        )
        .join("")
    } else {
      // for interaces and objects, select the defined fields
      output += modelPrimitives
      output += primitiveFields
        .filter(p => p !== "id") // id will be automatically inserted by the query generator
        .map(p => `.${p}`)
        .join("")
    }

    return output
  }

  function generateRootStore() {
    toExport.push("RootStore")

    const entryFile = `${ifTS('import { Instance } from "mobx-state-tree"\n')}\
import { RootStoreBase } from "./RootStore.base${importPostFix}"

${
  format == "ts"
    ? "export interface RootStoreType extends Instance<typeof RootStore.Type> {}\n\n"
    : ""
}\
export const RootStore = RootStoreBase
${exampleAction}
`

    const modelFile = `\
${header}
${ifTS(`import { ObservableMap } from "mobx"\n`)}\
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin${
      format === "ts" ? ", QueryOptions, withTypedRefs" : ""
    } } from "mst-gql"
${objectTypes
  .map(
    t =>
      `\nimport { ${t}Model${ifTS(
        `, ${t}ModelType`
      )} } from "./${t}Model${importPostFix}"${
        modelsOnly
          ? ""
          : `\nimport { ${toFirstLower(
              t
            )}ModelPrimitives, ${t}ModelSelector } from "./${t}Model.base${importPostFix}"`
      }`
  )
  .join("")}
${enumTypes
  .map(t => `\nimport { ${t} } from "./${t}Enum${importPostFix}"`)
  .join("")}
${ifTS(
  inputTypes
    .map(
      t =>
        `\nexport type ${t.name} = {\n${t.inputFields
          .map(field => `  ${printTsType(field)}`)
          .join("\n")}\n}`
    )
    .join("")
)}
${ifTS(`/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
${rootTypes
  .map(
    t =>
      `  ${transformRootName(
        t,
        namingConvention
      )}: ObservableMap<string, ${t}ModelType>`
  )
  .join(",\n")}
}\n\n`)}\
/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = ${ifTS("withTypedRefs<Refs>()(")}${
      modelsOnly ? "types.model()" : "MSTGQLStore"
    }
  .named("RootStore")
  .extend(configureStoreMixin([${origObjectTypes
    .map(s => `['${s}', () => ${transformTypeName(s, namingConvention)}Model]`)
    .join(", ")}], [${origRootTypes.map(s => `'${s}'`).join(", ")}]${
      namingConvention == "asis" ? "" : `, "${namingConvention}"`
    }))
  .props({
${rootTypes
  .map(
    t =>
      `    ${transformRootName(
        t,
        namingConvention
      )}: types.optional(types.map(types.late(()${ifTS(
        ": any"
      )} => ${t}Model)), {})`
  ) // optional should not be needed here..
  .join(",\n")}
  })
  .actions(self => ({${generateQueries()}
  }))${ifTS(")")}
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
            : `<{ ${name}: ${returnType.name}ModelType${
                returnsList ? "[]" : ""
              }}>`

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
            ? `: { ${args.map(arg => `${printTsType(arg)}`).join(", ")} }`
            : ""
        return `\
${optPrefix("\n    // ", sanitizeComment(description))}
    ${methodPrefix}${toFirstUpper(name)}(variables${
          args.length === 0 && format === "ts" ? "?" : ""
        }${tsVariablesType}, resultSelector${
          ifTS(
            `: string | ((qb: ${returnType.name}ModelSelector) => ${returnType.name}ModelSelector)`
          ) /* TODO or GQL object */
        } = ${toFirstLower(
          returnType.name
        )}ModelPrimitives.toString()${extraFormalArgs}) {
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

  function printTsType(field, name, canBeUndefined = true) {
    let typeValue
    let type

    if (!name) {
      name = field.name
      type = field.type
    } else {
      type = field
    }

    switch (type.kind) {
      case "NON_NULL":
        return printTsType(type.ofType, name, false)
      case "LIST":
        return `${printTsType(type.ofType, name, true)}[]`
      case "OBJECT":
      case "INPUT_OBJECT":
      case "ENUM":
        typeValue = type.name
        break
      case "SCALAR":
        typeValue = printTsPrimitiveType(type.name)
        break
      default:
        console.warn(
          "Not implemented printTsType yet, PR welcome for " +
            JSON.stringify(type, null, 2)
        )
        typeValue = "any"
    }

    return `${name}${canBeUndefined ? "?" : ""}: ${typeValue}`
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

import { createStoreContext, createUseQueryHook } from "mst-gql"
import * as React from "react"
${
  format === "ts"
    ? `import { RootStore${ifTS(
        ", RootStoreType"
      )} } from "./RootStore${importPostFix}"`
    : ""
}

export const StoreContext = createStoreContext${
      format === "ts" ? `<RootStoreType>` : ""
    }(React)

export const useQuery = createUseQueryHook(StoreContext, React)
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

  function addImportToMap(
    importMap,
    currentModuleName,
    moduleName,
    ...toBeImported
  ) {
    if (moduleName !== currentModuleName) {
      if (importMap.has(moduleName)) {
        importMap.get(moduleName).add(...toBeImported)
      } else {
        importMap.set(moduleName, new Set(toBeImported))
      }
    }
  }

  function printRelativeImports(imports) {
    const moduleNames = [...imports.keys()].sort()
    return (
      moduleNames
        .map(moduleName => {
          const toBeImported = [...imports.get(moduleName)].sort()
          return `import { ${[...toBeImported].join(
            ", "
          )} } from "./${moduleName}${importPostFix}"`
        })
        .join("\n") + (moduleNames.length > 0 ? "\n\n" : "\n")
    )
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

function resolveInterfaceAndUnionTypes(types) {
  // This function:
  // - inlines interfaces by spreading all the fields defined in interfaces into the object definitions themselves
  // - returns a map of union and interfaces and each union and interface contains the member/derived types
  const result = new Map()
  const interfaces = new Map()
  const memberTypesToUnions = new Map()
  types.forEach(type => {
    if (type.kind === "INTERFACE") {
      interfaces.set(type.name, type)
    } else if (type.kind === "UNION") {
      type.possibleTypes.forEach(possibleType => {
        if (memberTypesToUnions.has(possibleType.name)) {
          const unions = memberTypesToUnions.get(possibleType.name)
          unions.add(type)
        } else {
          memberTypesToUnions.set(possibleType.name, new Set([type]))
        }
      })
    }
  })
  types.forEach(type => {
    if (type.kind === "OBJECT") {
      type.interfaces.forEach(i => {
        const interfaceType = interfaces.get(i.name)
        upsertInterfaceOrUnionType(interfaceType, type, result)

        interfaceType.fields.forEach(interfaceField => {
          if (
            !type.fields.some(
              objectField => objectField.name === interfaceField.name
            )
          )
            type.fields.push(interfaceField) // Note: is inlining necessary? Deriving objects need to define all interface properties?
        })
      })
      if (memberTypesToUnions.has(type.name)) {
        memberTypesToUnions
          .get(type.name)
          .forEach(union => upsertInterfaceOrUnionType(union, type, result))
      }
    }
  })

  return result
}
function upsertInterfaceOrUnionType(type, subType, result) {
  if (result.has(type.name)) {
    const interfaceOrUnionType = result.get(type.name)
    interfaceOrUnionType.ofTypes.push(subType)
  } else {
    const interfaceOrUnionType = {
      name: type.name,
      kind: type.kind,
      ofTypes: [subType]
    }
    if (type.kind === "INTERFACE") {
      interfaceOrUnionType.fields = type.fields
    }
    result.set(type.name, interfaceOrUnionType)
  }
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

function writeFiles(
  outDir,
  files,
  format = "ts",
  forceAll = false,
  log = false,
  separate = false
) {
  function deCapitalize(str) {
    return `${str.charAt(0).toLowerCase()}${str.slice(1)}`
  }

  files.forEach(([name, contents, force]) => {
    const splits = name.split(".")
    const isModelOrStore = /(Model|Store)$/.test(splits[0])

    if (!separate || !isModelOrStore) {
      writeFile(name, contents, force || forceAll, format, outDir, log)
    } else {
      const targetDir = `${outDir}/${deCapitalize(splits[0])}`
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir)
      }

      writeFile(
        splits[1] || "index",
        contents,
        force || forceAll,
        format,
        targetDir,
        log
      )
    }
  })
}

function writeFile(name, contents, force, format, outDir, log) {
  const fnName = path.resolve(outDir, name + "." + format)
  if (!fs.existsSync(fnName) || force) {
    log && console.log("Writing file " + fnName)
    fs.writeFileSync(fnName, contents)
  } else {
    log && console.log("Skipping file " + fnName)
  }
}

// used by tests
function scaffold(
  definition,
  options = {
    format: "ts",
    roots: [],
    excludes: [],
    modelsOnly: false,
    namingConvention: "asis"
  }
) {
  const schema = graphql.buildSchema(definition)
  const res = graphql.graphqlSync(schema, graphql.introspectionQuery)
  if (!res.data)
    throw new Error("graphql parse error:\n\n" + JSON.stringify(res, null, 2))
  return generate(
    res.data.__schema.types,
    options.format || "ts",
    options.roots || [],
    options.excludes || [],
    "<during unit test run>",
    options.modelsOnly || false,
    options.noReact || false,
    options.namingConvention || "asis"
  )
}

/**
 * Transforms {@code text} according to namingConvention.
 * If namingConvention is {@code null} or {@code asis} the same text will be
 * returned. If namingConvention is {@code js} text will be PascalCased
 * @param text to be transformed
 * @param namingConvention naming convention to be used for transformation
 * @returns {string|*}
 */
function transformTypeName(text, namingConvention) {
  if (!text) {
    return text
  }
  if (namingConvention === "js") {
    return camelcase(text, { pascalCase: true })
  }
  return text
}

/**
 * Transforms {@code text} according to namingConvention.
 * If namingConvention is {@code null} or {@code asis} the same text will be
 * returned. If namingConvention is {@code js} text will be camelCased
 * @param text to be transformed
 * @param namingConvention naming convention to be used for transformation
 * @returns {string|*}
 */
function transformName(text, namingConvention) {
  if (!text) {
    return text
  }
  if (namingConvention === "js") {
    return camelcase(text)
  }
  return text
}

/**
 * Transform {@code text} according to namingConvention.
 * If namingConvention is {@code null} or {@code asis} the same text will be
 * returned. If namingConvention is {@code js} text will be camelCased and
 * pluralized
 * @param text to be transformed
 * @param namingConvention naming convention to be used for transformation
 * @returns {string|*}
 */
function transformRootName(text, namingConvention) {
  if (!text) {
    return text
  }
  if (namingConvention === "js") {
    // Pluralize only last word (pluralize may fail with words that are
    // not valid English words as is the case with LongCamelCaseTypeNames)
    const newName = transformName(text, namingConvention)
    const parts = newName.split(/(?=[A-Z])/)
    parts[parts.length - 1] = pluralize(parts[parts.length - 1])
    return parts.join("")
  }
  return text.toLowerCase() + "s"
}

/**
 * Converts types names in the graphql schema {@code types} according to
 * the {@code namingConvention}. If namingConvention is {@code null} or
 * {@code asis} type names won't be transformed.
 * If namingConvention is {@code js} type named will be PascalCased and the
 * original type names will be stored in the {@code origName} field.
 * @param types graphql schema types
 * @param namingConvention
 */
function transformTypes(types, namingConvention) {
  //console.log(JSON.stringify(types, null, 2));
  types
    .filter(type => !type.name.startsWith("__"))
    .filter(type => type.kind !== "SCALAR")
    .forEach(type => transformType(type, namingConvention))
  //console.log(JSON.stringify(types, null, 2));
}

/**
 * Transforms names of a graphql {@code type} object according to
 * {@code namingConvention}. Name of types of kind OBJECT, INPUT_OBJECT,
 * ENUM, LIST and NON_NULL and changed according to {@code namingConvention}
 * recursively. If namingConvention is {@code js} type named will be
 * PascalCased and the original type names will be stored in the
 * {@code origName} field.
 * @param type a graphql type definition object
 * @param namingConvention
 */
function transformType(type, namingConvention) {
  if (
    type.kind === "OBJECT" ||
    type.kind === "INPUT_OBJECT" ||
    type.kind === "ENUM" ||
    type.kind === "LIST" ||
    type.kind === "NON_NULL"
  ) {
    type.origName = type.name
    type.name = transformTypeName(type.name, namingConvention)

    // process type names in fields, inputFields and ofType
    if (type.fields) {
      type.fields.forEach(f => transformType(f.type, namingConvention))
    }
    if (type.inputFields) {
      type.inputFields.forEach(f => transformType(f.type, namingConvention))
    }
    if (type.ofType) {
      transformType(type.ofType, namingConvention)
    }
  }
}

function logUnexpectedFiles(outDir, files) {
  const expectedFiles = new Set(files.map(([name]) => name))
  fs.readdirSync(outDir).forEach(file => {
    if (!expectedFiles.has(path.parse(file).name)) {
      console.log(
        `Unexpected file "${file}". This could be a type that is no longer needed.`
      )
    }
  })
}

module.exports = { generate, writeFiles, scaffold, logUnexpectedFiles }
