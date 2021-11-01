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

// prepare reactive results with proxies and for any depth
function buildResponse(data: any, store: any) {
  if (!data || typeof data !== "object") return data
  if (Array.isArray(data)) return new Proxy(data, proxyHandler(store))

  const { __typename, id } = data

  if (__typename && id) {
    const typeDef = store.getTypeDef(__typename)

    return resolveIdentifier(typeDef, store, id)
  }

  const reactiveResult: any = {}

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      reactiveResult[key] = buildResponse(data[key], store)
    }
  }

  return reactiveResult
}

// logic to wrap and update mst-tree
export function mergeHelper(store: any, initialData: any): any {
  function merge(data: any): any {
    if (!data || typeof data !== "object") return data
    if (Array.isArray(data)) return data.map(merge)

    const { __typename, id } = data
    const snapshot: any = {}

    for (const key in data) {
      if (isObject(data[key]) || Array.isArray(data[key])) {
        snapshot[key] = merge(data[key])
      } else {
        snapshot[key] = data[key]
      }
    }

    if (__typename && store.isKnownType(__typename)) {
      // process with root types
      if (store.isRootType(__typename)) {
        const rootMap = store[store.getCollectionName(__typename)]
        const instance = rootMap.get(id)
        const newInstance = {
          ...(instance ? getSnapshot<Object>(instance) : {}),
          ...snapshot
        }
        rootMap.set(id, newInstance)
        // another ones
      } else {
        const typeDef = store.getTypeDef(__typename)
        const instance = typeDef.create(snapshot)
        instance.__setStore(store)

        return instance
      }
    }

    return __typename && store.isRootType(__typename) ? id : snapshot
  }

  merge(initialData)

  return buildResponse(initialData, store)
}
