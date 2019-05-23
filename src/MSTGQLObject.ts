import {
  types,
  getParent,
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
export function MSTGQLRef<T extends IAnyModelType>(
  targetType: T
): IReferenceType<T> {
  return types.reference(targetType, {
    get(id: string, parent: any) {
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
      return value.id
    }
  })
}

export const MSTGQLObject = types.model("MSTGQLObject").extend(self => {
  const loadedFields = observable.set<string>([])
  let store: StoreType

  function getStore(): StoreType {
    return store || (store = getParent(self, 2))
  }

  return {
    actions: {
      __setStore(s: StoreType) {
        store = s
      },
      __markFieldLoaded(key: string) {
        loadedFields.add(key)
      }
    },
    views: {
      __getStore<T>() {
        return (getStore() as any) as T
      },
      hasLoaded(key: string): boolean {
        return loadedFields.has(key)
      }
    }
  }
})
