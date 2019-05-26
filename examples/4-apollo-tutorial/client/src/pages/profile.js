import React, { Fragment, useContext } from "react"

import { LAUNCH_TILE_DATA, useQuery } from "../models"
import { Loading, Header, LaunchTile } from "../components"
import { observer } from "mobx-react"
import gql from "graphql-tag"

export const GET_MY_TRIPS = gql`
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

export default observer(function Profile() {
  const { query, store } = useQuery(GET_MY_TRIPS)

  return query.case({
    error: error => <p>ERROR: {error.message}</p>,
    // render cached trips if available
    loading: () => (store.hasTrips ? renderTrips(store) : <Loading />),
    data: () => renderTrips(store)
  })
})

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
