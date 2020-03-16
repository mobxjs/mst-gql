import { resolveIdentifier } from "mobx-state-tree"
import { typenameToCollectionName } from "./utils"

export function mergeHelper(store: any, data: any) {
  function merge(data: any): any {
    if (!data || typeof data !== "object") return data
    if (Array.isArray(data)) return data.map(merge)

    const { __typename, id } = data

    // convert values deeply first to MST objects as much as possible
    const snapshot: any = {}
    for (const key in data) {
      snapshot[key] = merge(data[key])
    }

    // GQL object
    if (__typename && store.isKnownType(__typename)) {
      // GQL object with known type, instantiate or recycle MST object
      const typeDef = store.getTypeDef(__typename)
      // Try to reuse instance, even if it is not a root type
      let instance = id !== undefined && resolveIdentifier(typeDef, store, id)
      if (instance) {
        // update existing object
        Object.assign(instance, snapshot)
      } else {
        // create a new one
        instance = typeDef.create(snapshot)
        if (store.isRootType(__typename)) {
          // register in the store if a root
          //store[typenameToCollectionName(__typename)].set(id, instance)
          store[store.getCollectionName(__typename)].set(id, instance)
        }
        instance.__setStore(store)
      }
      return instance
    } else {
      // GQL object with unknown type, return verbatim
      return snapshot
    }
  }

  return merge(data)
}
