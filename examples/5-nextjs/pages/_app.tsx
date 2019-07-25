
import React from 'react'
import { getSnapshot, ModelCreationType } from 'mobx-state-tree'
import { getDataFromTree } from 'mst-gql';
import App, { Container } from 'next/app'
import { initializeStore } from '../utils/initModels'
import { RootStoreType, StoreContext } from '../src/models';

export default class MyApp extends App<any, any> {
  
  store: ModelCreationType<RootStoreType>

  static async getInitialProps ({ Component, ctx, router }) {

    const isServer = typeof window === 'undefined'
    const store = initializeStore(isServer)
    if(isServer) {
      await getDataFromTree(<MyApp Component={Component} router={router} store={store} />, store)
    }

    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      initialState: getSnapshot<RootStoreType>(store),
      isServer,
      pageProps
    }
  }

  constructor (props) {
    super(props)
    this.store = props.store || initializeStore(props.isServer, props.initialState)
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <StoreContext.Provider value={this.store}>
          <Component {...pageProps} />
        </StoreContext.Provider>
      </Container>
    )
  }
}