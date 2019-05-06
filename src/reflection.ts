import {
  IAnyModelType,
  getPropertyMembers,
  isPrimitiveType
} from "mobx-state-tree"

export function typenameToCollectionName(typename: string) {
  return typename.toLowerCase() + "s"
}

export const coreFields = `\n__typename\nid\n`

export function primitiveFields(
  mstType: IAnyModelType,
  exclude: string[] = []
) {
  const excludes = new Set(exclude)
  const primitives = new Set(["id", "__typename"])
  const reflectionData = getPropertyMembers(mstType)
  for (const key in reflectionData.properties)
    if (!excludes.has(key)) {
      const type = reflectionData.properties[key]
      if (isPrimitiveType(type)) primitives.add(key)
    }
  return Array.from(primitives).join("\n")
}

// TODO: also have a utility for nested objects?
