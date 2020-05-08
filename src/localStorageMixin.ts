import { StoreType } from "./MSTGQLStore"
import {
  getType,
  applySnapshot,
  addDisposer,
  onSnapshot
} from "mobx-state-tree"

import { throttle } from "throttle-debounce"

// TODO: support skipping parts of the store, with a key filter for example
type LocalStorageMixinOptions = {
  storage?: {
    getItem(key: string): string | null | Promise<string | null>
    setItem(key: string, data: string): void
  }
  throttle?: number // How often the snapshot is written to local storage
  storageKey?: string
}
export function localStorageMixin(options: LocalStorageMixinOptions = {}) {
  const storage = options.storage || window.localStorage
  const throttleInterval = options.throttle || 5000
  const storageKey = options.storageKey || "mst-gql-rootstore"
  return (self: StoreType) => ({
    actions: {
      async afterCreate() {
        const data = await storage.getItem(storageKey)
        if (data) {
          const json = JSON.parse(data)
          const selfType = getType(self)
          if (!selfType.is(json)) {
            console.warn(
              `Data in local storage does not conform the data shape specified by ${selfType.name}, ignoring the stored data`
            )
            return
          }
          applySnapshot(self, json)
        }
        addDisposer(
          self,
          onSnapshot(
            self,
            throttle(throttleInterval, (data: any) => {
              storage.setItem(storageKey, JSON.stringify(data))
            })
          )
        )
      }
    }
  })
}
