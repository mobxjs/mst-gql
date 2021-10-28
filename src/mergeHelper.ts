import { isNumber, isObject } from "lodash"
import { resolveIdentifier, getSnapshot } from "mobx-state-tree"

// use a proxy for array-type structures, saves huge amounts of memory, and improves performance
const proxyHandler = (store: any) => ({
  get(target: any, prop: any, receiver: any) {
    const instance = Reflect.get(target, prop, receiver) as any

    if (isNumber(prop)) return instance

    const { __typename, id } = instance
    const typeDef = store.getTypeDef(__typename)

    return id !== undefined ? resolveIdentifier(typeDef, store, id) : instance
  }
})

export function mergeHelper(store: any, initialData: any): any {
  const reactiveResult: any = {}

  function merge(data: any, depth = 0, prevKey = ""): any {
    if (!data || typeof data !== "object") return data
    if (Array.isArray(data)) return data.map((d) => merge(d, depth, prevKey))

    const { __typename, id } = data
    const snapshot: any = {}

    // convert values deeply first to MST objects as much as possible
    for (const key in data) {
      if (isObject(data[key]) || Array.isArray(data[key])) {
        snapshot[key] = merge(data[key], depth + 1, key)
      } else {
        snapshot[key] = data[key]
      }
    }

    if (__typename && store.isKnownType(__typename)) {
      // process with root types
      if (store.isRootType(__typename)) {
        const rootMap = store[store.getCollectionName(__typename)]
        const instance = rootMap.get(id)
        // update existing object
        const newInstance = {
          ...(instance ? getSnapshot<Object>(instance) : {}),
          ...snapshot
        }
        // register in the store if a root
        rootMap.set(id, newInstance)
      } else {
        // try create a new one and return non root type model
        const typeDef = store.getTypeDef(__typename)
        const instance = typeDef.create(snapshot)
        instance.__setStore(store)

        return instance
      }
    }

    // build reactive structure as result this merge logic,
    // only for the first keys in the gql response, this is sufficient
    // as the rest of the tree will be reactive due to the mst structure
    if (depth === 1 && prevKey) {
      if (!reactiveResult[prevKey]) {
        reactiveResult[prevKey] = Array.isArray(initialData[prevKey])
          ? new Proxy([], proxyHandler(store))
          : {}
      }

      if (Array.isArray(initialData[prevKey])) {
        reactiveResult[prevKey].push(snapshot)
      } else {
        const typeDef = store.getTypeDef(__typename)
        const instance = typeDef
          ? resolveIdentifier(typeDef, store, id)
          : snapshot
        reactiveResult[prevKey] = instance
      }
    }

    return __typename && store.isRootType(__typename) ? id : snapshot
  }

  merge(initialData)

  return reactiveResult
}
