import { types, getParent, getSnapshot, addDisposer } from "mobx-state-tree"
import { autorun } from "mobx"

import { MSTGQLStore } from "./MSTGQLStore"

export const MSTGQLObject = types
  .model("MSTGQLObject", {
    __typename: types.string,
    id: types.identifier
  })
  .views(self => ({
    get store(): typeof MSTGQLStore.Type {
      return getParent(self, 2)
    }
  }))
  .actions(self => {
    function getMutationParams(): string {
      const snapshot: any = getSnapshot(self)
      return Object.keys(snapshot)
        .map(key => `${key}: ${JSON.stringify(snapshot[key])}`)
        .join(", ")
    }

    return {
      getMutationParams,
      delete(mutationName: string) {
        return self.store.mutate(
          `mutation ${mutationName}(id: $id){}`,
          { id: self.id },
          () => {
            getParent<any>(self).delete(self.id)
          }
        )
      },
      save(mutationName: string) {
        return self.store.mutate(
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
    }
  })
