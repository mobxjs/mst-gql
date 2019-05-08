import React from "react"

import Button from "../components/button"
import { GET_LAUNCH } from "./cart-item"
import { useMutation } from "../storeContext"

export { GET_LAUNCH }

export default function BookTrips() {
  return useMutation((store, startMutation, { loading, error, data }) =>
    data && data.bookTrips && !data.bookTrips.success ? (
      <p data-testid="message">{data.bookTrips.message}</p>
    ) : (
      <Button
        onClick={() => startMutation(store.bookTrips())}
        data-testid="book-button"
      >
        Book All
      </Button>
    )
  )
}
