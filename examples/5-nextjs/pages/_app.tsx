import React from "react"
import { applySnapshot, getSnapshot, ModelCreationType } from "mobx-state-tree"
import { createHttpClient, getDataFromTree } from "mst-gql"
import App from "next/app"
import { RootStore, RootStoreType, StoreContext } from "../src/models"

const isServer: boolean = !process.browser

let store: ModelCreationType<RootStoreType>

export function getStore(snapshot = null): ModelCreationType<RootStoreType> {
  if (isServer || !store) {
    store = RootStore.create(undefined, {
      gqlHttpClient: createHttpClient("http://localhost:3000/api/graphql"),
      ssr: true
    })
  }
  if (snapshot) {
    applySnapshot(store, snapshot)
  }
  return store
}

export default class MyApp extends App<any, any> {
  store: ModelCreationType<RootStoreType>

  static async getInitialProps({ Component, ctx, router }) {
    const store = getStore()

    const pageProps = (Component.getInitialProps && await Component.getInitialProps({...ctx, store})) || {}

    let storeSnapshot
    if (isServer) {
      const tree = <MyApp {...({Component, router, pageProps, store})}/>
      await getDataFromTree(tree, store)
      storeSnapshot = getSnapshot<RootStoreType>(store)
    }

    return {pageProps, storeSnapshot}
  }

  constructor(props) {
    super(props)
    this.store = props.store || getStore(props.storeSnapshot)
    Object.assign(global, {store: this.store}) // for debugging
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <StoreContext.Provider value={this.store}>
        <Component {...pageProps} />
      </StoreContext.Provider>
    )
  }
}
