import React from "react"
import { observer } from "mobx-react"
import Button from "../components/button"
import { useQuery } from "../models/reactUtils"

export default observer(function ActionButton({ launch }) {
  const { store, setQuery, loading, error } = useQuery()

  if (loading) return <p>Loading...</p>
  if (error) return <p>An error occurred</p>

  return (
    <div>
      <Button
        onClick={() =>
          launch.isBooked
            ? setQuery(store.cancelTrip(launch.id))
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
