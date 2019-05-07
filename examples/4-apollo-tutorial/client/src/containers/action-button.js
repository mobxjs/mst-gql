import React from "react"
import Button from "../components/button"

export default function ActionButton({ isBooked, id, isInCart }) {
  return withStore(store => (
    <div>
      <Button
        onClick={() => store.addOrRemoveFromCart(id)}
        isBooked={isBooked}
        data-testid={"action-button"}
      >
        {isBooked
          ? "Cancel This Trip"
          : isInCart
          ? "Remove from Cart"
          : "Add to Cart"}
      </Button>
    </div>
  ))
}
