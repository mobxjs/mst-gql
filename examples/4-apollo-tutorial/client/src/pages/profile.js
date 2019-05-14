import React, { Fragment, useContext } from "react"

import { renderQuery, StoreContext } from "../storeContext"
import { Loading, Header, LaunchTile } from "../components"
import { LAUNCH_TILE_DATA } from "../models/Launch"

export const GET_MY_TRIPS = `
  query GetMyTrips {
    me {
      id
      __typename
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`

export default function Profile() {
  const store = useContext(StoreContext)
  return renderQuery(
    GET_MY_TRIPS,
    {},
    {
      error: error => <p>ERROR: {error.message}</p>,
      // render cached trips if available
      loading: () => (store.hasTrips ? renderTrips(store) : <Loading />),
      data: () => renderTrips(store)
    }
  )
}

function renderTrips(store) {
  return (
    <Fragment>
      <Header>My Trips</Header>
      {store.hasTrips ? (
        store.me.trips.map(launch => (
          <LaunchTile key={launch.id} launch={launch} />
        ))
      ) : (
        <p>You haven't booked any trips</p>
      )}
    </Fragment>
  )
}
