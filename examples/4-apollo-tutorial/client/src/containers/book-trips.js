import React from "react"
import { observer } from "mobx-react"

import Button from "../components/button"
import { GET_LAUNCH } from "./cart-item"
import { useQuery } from "../models/reactUtils"

export { GET_LAUNCH }

export default observer(function BookTrips() {
  const { store, setQuery, data } = useQuery()

  if (data && data.bookTrips && !data.bookTrips.success)
    return <p data-testid="message">{data.bookTrips.message}</p>
  return (
    <Button
      onClick={() => setQuery(store.bookTrips())}
      data-testid="book-button"
    >
      Book All
    </Button>
  )
})
