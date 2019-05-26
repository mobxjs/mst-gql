import React, { Fragment, useContext } from "react"
import { observer } from "mobx-react"

import { StoreContext } from "../models/reactUtils"
import { Header } from "../components"
import { CartItem, BookTrips } from "../containers"

export default observer(function Cart() {
  const store = useContext(StoreContext)
  return (
    <Fragment>
      <Header>My Cart</Header>
      {!store.cartItems.length ? (
        <p data-testid="empty-message">No items in your cart</p>
      ) : (
        <Fragment>
          {store.cartItems.map(launchId => (
            <CartItem key={launchId} launchId={launchId} />
          ))}
          <BookTrips />
        </Fragment>
      )}
    </Fragment>
  )
})
