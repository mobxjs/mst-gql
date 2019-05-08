import { types, getParent, getSnapshot, addDisposer } from "mobx-state-tree"
import { autorun, observable } from "mobx"

import { StoreType } from "./MSTGQLStore"

export const MSTGQLObject = types
  .model("MSTGQLObject", {
    __typename: types.string,
    id: types.identifier
  })
  .extend(self => {
    const loadedFields = observable.set<string>([])

    function getMutationParams(): string {
      const snapshot: any = getSnapshot(self)
      return Object.keys(snapshot)
        .map(key => `${key}: ${JSON.stringify(snapshot[key])}`)
        .join(", ")
    }

    function getStore(): StoreType {
      return getParent(self, 2)
    }

    return {
      actions: {
        markFieldLoaded(key: string) {
          loadedFields.add(key)
        },
        getMutationParams,
        delete(mutationName: string) {
          return getStore().mutate(
            `mutation ${mutationName}(id: $id){}`,
            { id: self.id },
            () => {
              getParent<any>(self).delete(self.id)
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
