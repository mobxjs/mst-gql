import React from "react"

import Button from "../components/button"
import { GET_LAUNCH } from "./cart-item"
import { Query } from "../models/reactUtils"

export { GET_LAUNCH }

export default function BookTrips() {
  return (
    <Query>
      {({ store, setQuery, loading, error, data }) =>
        data && data.bookTrips && !data.bookTrips.success ? (
          <p data-testid="message">{data.bookTrips.message}</p>
        ) : (
          <Button
            onClick={() => setQuery(store.bookTrips())}
            data-testid="book-button"
          >
            Book All
          </Button>
        )
      }
    </Query>
  )
}
