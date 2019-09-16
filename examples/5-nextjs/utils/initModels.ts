import { applySnapshot, ModelCreationType } from "mobx-state-tree"
import { createHttpClient } from "mst-gql"
import { RootStoreType, RootStore } from "../src/models"

let store: ModelCreationType<RootStoreType>

export function initializeStore(
  isServer: boolean,
  snapshot = null
): ModelCreationType<RootStoreType> {
  if (isServer) {
    store = RootStore.create(undefined, {
      gqlHttpClient: createHttpClient("http://localhost:3000/api/graphql"),
      ssr: true
    })
  }
  if (store === null) {
    store = RootStore.create(undefined, {
      gqlHttpClient: createHttpClient("http://localhost:3000/api/graphql")
    })
  }
  if (snapshot) {
    applySnapshot(store, snapshot)
  }
  return store
}
