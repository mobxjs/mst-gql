import { typenameToCollectionName } from "./reflection"

export function mergeHelper(store: any, itemData: any) {
  const { __typename, id } = itemData
  if (__typename === undefined)
    throw new Error(
      "__typename field is not available on " + JSON.stringify(itemData)
    )
  if (id === undefined)
    throw new Error("id field is not available on " + JSON.stringify(itemData))
  const collection = typenameToCollectionName(__typename)
  const current = store[collection].get(id)
  if (!current) {
    store[collection].set(id, itemData)
    return store[collection].get(id)
  } else {
    // TODO: merge should be recursive for complex values
    Object.assign(current, itemData)
    return current
  }
}
