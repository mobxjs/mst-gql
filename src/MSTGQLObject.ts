import {
  types,
  getParent,
  getRoot,
  IAnyModelType,
  resolveIdentifier,
  IReferenceType
} from "mobx-state-tree"
import { observable } from "mobx"

import { StoreType } from "./MSTGQLStore"

/*
 For detached objects (objects that are not part of the Roots, or one of their children, for example: query results),
 we cannot use the default resolution mechanism, since they are not part of the store. So, first fetch the store and resolve from there
*/
const MSTGQL_ID_DELIM = "::"
export function getMSTGQLRefLabelAndId(labeledId: string) {
  if (labeledId.includes(MSTGQL_ID_DELIM)) {
    const [label, ...id] = labeledId.split(MSTGQL_ID_DELIM)
    return { label, id: id.join("") }
  }

  return { label: null, id: labeledId }
}

export function MSTGQLRef<T extends IAnyModelType>(
  targetType: T,
  label: string = targetType.name
): IReferenceType<T> {
  return types.reference(targetType, {
    get(labeledId: string, parent: any) {
      const id = getMSTGQLRefLabelAndId(labeledId).id
      const node = resolveIdentifier(
        targetType,
        parent.store || getParent<any>(parent).store,
        id
      )
      if (!node) {
        throw new Error(
          `Failed to resolve reference ${id} to ${targetType.name}`
        )
      }
      return node
    },
    set(value: any) {
      const typeDef = value.store.getTypeDef(value.__typename)
      const id = value[typeDef.identifierAttribute ?? 'id']
      return [label, MSTGQL_ID_DELIM, id].join("")
    }
  })
}

export const MSTGQLObject = types.model("MSTGQLObject").extend((self) => {
  let store: StoreType

  function getStore(): StoreType {
    // https://github.com/mobxjs/mobx-state-tree/issues/1408#issuecomment-547247080
    return store || (store = getRoot(self))
  }

  return {
    actions: {
      __setStore(s: StoreType) {
        store = s
      }
    },
    views: {
      __getStore<T>() {
        return getStore() as any as T
      },
      hasLoaded(key: string): boolean {
        return typeof (self as any)[key] !== "undefined"
      }
    }
  }
})
