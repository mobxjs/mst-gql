import React, { Fragment } from "react"

import { withStore } from "../storeContext"
import { Header } from "../components"
import { CartItem, BookTrips } from "../containers"

export default function Cart() {
  return withStore(store => (
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
  ))
}
