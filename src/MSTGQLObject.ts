import {
  types,
  getParent,
  getSnapshot,
  addDisposer,
  IAnyModelType,
  resolveIdentifier
} from "mobx-state-tree"
import { autorun, observable } from "mobx"

import { StoreType } from "./MSTGQLStore"

/*
 For detached objects (objects that are not part of the Roots, or one of their children, for example: query results),
 we cannot use the default resolution mechanism, since they are not part of the store. So, first fetch the store and resolve from there
*/
export function MSTGQLRef(targetType: IAnyModelType) {
  // TODO: move to own file
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

export const MSTGQLObject = types
  .model("MSTGQLObject", {
    __typename: types.string
  })
  .extend(self => {
    const loadedFields = observable.set<string>([])
    let store: StoreType

    function getMutationParams(): string {
      const snapshot: any = getSnapshot(self)
      return Object.keys(snapshot)
        .map(key => `${key}: ${JSON.stringify(snapshot[key])}`)
        .join(", ")
    }

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
        },
        getMutationParams,
        delete(mutationName: string) {
          const { id } = self as any
          if (id === undefined)
            throw new Error("cannot 'delete' objects without identifier field")
          return getStore().mutate(
            `mutation ${mutationName}(id: $id){}`,
            { id },
            () => {
              getParent<any>(self).delete(id)
            }
          )
        },
        save(mutationName: string) {
          return getStore().mutate(
            `mutation ${mutationName}(${getMutationParams()}){}`
          )
        },
        startAutoSave(mutationName: string) {
          addDisposer(
            self,
            autorun(() => {
              ;(self as any).save(mutationName)
            })
          ) // TODO: debounce
        }
      },
      views: {
        get store() {
          return getStore()
        },
        hasLoaded(key: string): boolean {
          return loadedFields.has(key)
        }
      }
    }
  })
