import { StoreType } from "./MSTGQLStore"
import {
  getType,
  applySnapshot,
  addDisposer,
  onSnapshot
} from "mobx-state-tree"

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
  let __canSave = true
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
            throttle((data: any) => {
              if (__canSave) storage.setItem(storageKey, JSON.stringify(data))
            }, throttleInterval)
          )
        )
      },
      stopStorage() {
        __canSave = false
      },
      startStorage() {
        __canSave = true
      }
    }
  })
}

function throttle(fn: Function, delay: number) {
  let lastCall = 0
  let scheduled = false

  return function(...args: any[]) {
    // already scheduled
    if (scheduled) return
    const now = +new Date()
    if (now - lastCall < delay) {
      if (!scheduled) {
        // within throttle period, but no next tick scheduled, schedule now
        scheduled = true
        setTimeout(() => {
          // run and reset
          lastCall = +new Date()
          scheduled = false
          fn.apply(null, args)
        }, delay - (now - lastCall) + 10) // fire at the end of the current delay period
      }
    } else {
      // outside throttle period, can execute immediately
      lastCall = now
      fn.apply(null, args)
    }
  }
}
