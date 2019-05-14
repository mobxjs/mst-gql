import React from "react"
import gql from "graphql-tag"

import { Query } from "../models/reactUtils"
import { LAUNCH_TILE_DATA } from "../models/"

import LaunchTile from "../components/launch-tile"

export const GET_LAUNCH = gql`
  query GetLaunch($launchId: ID!) {
    launch(id: $launchId) {
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`

export default function CartItem({ launchId }) {
  return (
    <Query query={GET_LAUNCH} variables={{ launchId }}>
      {({ query }) =>
        query.case({
          error: error => <p>ERROR: {error.message}</p>,
          loading: () => <p>Loading...</p>,
          data: launch => <LaunchTile launch={launch} />
        })
      }
    </Query>
  )
}
