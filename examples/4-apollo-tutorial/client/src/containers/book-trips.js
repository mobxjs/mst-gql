import React, { useState, useContext } from "react"

import Button from "../components/button"
import { GET_LAUNCH } from "./cart-item"
import { StoreContext } from "../storeContext"

export { GET_LAUNCH }

export default function BookTrips() {
  const store = useContext(StoreContext)
  const [mutationState, setMutationState] = useState(null)

  return !mutationState ? (
    <Button
      onClick={() => setMutationState(store.bookTrips())}
      data-testid="book-button"
    >
      Book All
    </Button>
  ) : (
    mutationState.case({
      error: () => <p>Oops...</p>,
      fetching: () => <p>Processing...</p>,
      data: bookTrips => <p data-testid="message">{bookTrips.message}</p>
    })
  )
}
