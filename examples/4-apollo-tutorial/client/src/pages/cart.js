import React, { Fragment } from 'react';

import { Header, Loading } from '../components';
import { CartItem, BookTrips } from '../containers';

export default function Cart() {
  return withStore(store => <Fragment>
            <Header>My Cart</Header>
            {!store.cartItems.length ? (
              <p data-testid="empty-message">No items in your cart</p>
            ) : (
              <Fragment>
                {data.cartItems.map(launchId => (
                  <CartItem key={launchId} launchId={launchId} />
                ))}
                <BookTrips cartItems={data.cartItems} />
              </Fragment>
            )}
          </Fragment>
        )
}
