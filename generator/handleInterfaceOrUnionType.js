/**
 * Goal is to have a query builder that can create queries with inline fragments:
 * query {
 *  search {
 *    ... on Book {
 *      title
 *    }
 *    ... on Author {
 *      name
 *    }
 * }
 * TODO: for now, just copy from generate.js what we need.. if this is okay, refactor later
 */
const handleInterfaceOrUnionType = (
  type,
  interfaceAndUnionTypes,
  modelsOnly,
  importPostFix,
  toExport,
  format,
  generateFile
) => {
  // Only a model selector will be generated, not a mst model
  // That is, interface/unions don't have a mst model
  if (modelsOnly) return

  // add imports for the ofTypes model selectors
  const interfaceOrUnionType = interfaceAndUnionTypes.get(type.name)
  const imports = []

  const modelSelector = createModelSelector(
    interfaceOrUnionType,
    imports,
    format
  )

  let contents = 'import { QueryBuilder } from "mst-gql"\n'
  contents += interfaceOrUnionType.ofTypes
    .map(
      t =>
        `import { ${t.name}ModelSelector, ${toFirstLower(
          t.name
        )}ModelPrimitives } from "./${t.name}Model.base${importPostFix}"`
    )
    .join("\n")

  contents += imports
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

  contents += `\n\n${modelSelector}`

  toExport.push(type.name + "ModelSelector")
  generateFile(type.name + "ModelSelector", contents)
}

// TODO: refactor, mostly duplicated -->
const resolvePrimitivesAndImports = (
  fields,
  imports,
  primitiveFields = [],
  nonPrimitiveFields = []
) => {
  fields.forEach(field =>
    resolveFieldType(
      field.name,
      field.type,
      primitiveFields,
      nonPrimitiveFields,
      imports
    )
  )
  return { primitiveFields, nonPrimitiveFields, imports }
}
const resolveFieldType = (
  fieldName,
  type,
  primitiveFields,
  nonPrimitiveFields,
  imports
) => {
  switch (type.kind) {
    case "SCALAR":
      primitiveFields.push(fieldName)
      break
    case "NON_NULL":
    case "LIST":
      resolveFieldType(
        fieldName,
        type.ofType,
        primitiveFields,
        nonPrimitiveFields,
        imports
      )
      break
    case "ENUM":
      imports.push(type.name + "Enum")
      // why is this not added as non-primitive?
      break
    case "OBJECT":
    case "INTERFACE":
    case "UNION":
      imports.push(type.name + "Model")
      nonPrimitiveFields.push([fieldName, type.name])
      break
    default:
      throw new Error(
        `Failed to resolve field type ${JSON.stringify(type)}. PR Welcome!`
      )
  }
}

const createModelSelector = (interfaceOrUnionType, imports, format) => {
  const { primitiveFields, nonPrimitiveFields } = interfaceOrUnionType.fields
    ? resolvePrimitivesAndImports(interfaceOrUnionType.fields, imports)
    : { primitiveFields: [], nonPrimitiveFields: [] }

  let output = `export class ${
    interfaceOrUnionType.name
  }ModelSelector extends QueryBuilder {\n`
  output += primitiveFields
    .map(p => `  get ${p}() { return this.__attr(\`${p}\`) }`)
    .join("\n")
  output += primitiveFields.length > 0 ? "\n" : ""
  output += nonPrimitiveFields
    .map(
      ([field, type]) =>
        `  ${field}(builder${ifTS(
          format,
          `?: string | ((${toFirstLower(type.name)}: ${
            type.name
          }ModelSelector) => ${type.name}ModelSelector)`
        )}) { return this.__child(\`${field}\`, ${
          type.name
        }ModelSelector, builder) }`
    )
    .join("\n")
  output += nonPrimitiveFields.length > 0 ? "\n" : ""
  output += interfaceOrUnionType.ofTypes
    .map(
      subType =>
        `  ${toFirstLower(subType.name)}(builder${ifTS(
          format,
          `?: string | ((${subType.name}: ${subType.name}ModelSelector) => ${
            subType.name
          }ModelSelector | ${subType.name}ModelSelector)`
        )}) { return this.__inlineFragment(\`${subType.name}\`, ${
          subType.name
        }ModelSelector, builder) }`
    )
    .join("\n")
  output += interfaceOrUnionType.ofTypes.length > 0 ? "\n" : ""
  output += "}\n"

  output += `export function selectFrom${interfaceOrUnionType.name}() {\n`
  output += `\treturn new ${interfaceOrUnionType.name}ModelSelector()\n`
  output += "}\n\n"

  const flowername = toFirstLower(interfaceOrUnionType.name)
  const modelPrimitives = `export const ${flowername}ModelPrimitives = selectFrom${
    interfaceOrUnionType.name
  }()`

  if (interfaceOrUnionType.kind === "UNION") {
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
  } else if (interfaceOrUnionType.kind === "INTERFACE") {
    // for interfaces, select the defined field of the interface
    output += modelPrimitives
    output += interfaceOrUnionType.fields
      .filter(f => f.name !== "id") // id will be automatically inserted by the query generator
      .map(f => `.${f.name}`)
      .join("")
      .toString()
  }

  return output
}

function ifTS(format, ifTSstr, notTSstr = "") {
  return format === "ts" ? ifTSstr : notTSstr
}
function toFirstLower(str) {
  return str[0].toLowerCase() + str.substr(1)
}

module.exports = {
  handleInterfaceOrUnionType
}
