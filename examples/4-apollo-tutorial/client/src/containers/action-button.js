import React from "react"
import Button from "../components/button"

import { useMutation } from "../storeContext"

export default function ActionButton({ launch }) {
  return useMutation((store, startMutation, { loading, error }) => {
    if (loading) return <p>Loading...</p>
    if (error) return <p>An error occurred</p>

    return (
      <div>
        <Button
          onClick={() =>
            launch.isBooked
              ? startMutation(store.cancelTrip(launch.id))
              : store.addOrRemoveFromCart(launch.id)
          }
          isBooked={launch.isBooked}
          data-testid={"action-button"}
        >
          {launch.isBooked
            ? "Cancel This Trip"
            : launch.isInCart
            ? "Remove from Cart"
            : "Add to Cart"}
        </Button>
      </div>
    )
  })
}
