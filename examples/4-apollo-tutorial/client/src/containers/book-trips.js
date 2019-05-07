import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Button from '../components/button';
import { GET_LAUNCH } from './cart-item';

export { GET_LAUNCH };


export default function BookTrips({ cartItems }) {
  const [mutationState, setMutationState] = useQuery(null)

  return (
    !mutationState ?
      <Button onClick={() => setMutationState(store.bookTrips())} data-testid="book-button">
        Book All
      </Button>
      :
      mutationState.case({
        error: () => <p>Oops...</p>,
        fetching: () => Booking...,
        data: (bookTrips) =>  <p data-testid="message">{data.bookTrips.message}</p>
      })   
  );
}
