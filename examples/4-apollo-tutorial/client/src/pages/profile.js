import React, { Fragment, useContext } from "react"

import { LAUNCH_TILE_DATA, Query } from "../models"
import { Loading, Header, LaunchTile } from "../components"
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

export default function Profile() {
  return (
    <Query query={GET_MY_TRIPS}>
      {({ query, store }) =>
        query.case({
          error: error => <p>ERROR: {error.message}</p>,
          // render cached trips if available
          loading: () => (store.hasTrips ? renderTrips(store) : <Loading />),
          data: () => renderTrips(store)
        })
      }
    </Query>
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
