import React from "react"
import gql from "graphql-tag"
import { observer } from "mobx-react"

import LaunchTile from "../components/launch-tile"

import { useQuery } from "../models/reactUtils"
import { LAUNCH_TILE_DATA } from "../models/"

export const GET_LAUNCH = gql`
  query GetLaunch($launchId: ID!) {
    launch(id: $launchId) {
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`

export default observer(function CartItem({ launchId }) {
  const { query } = useQuery(GET_LAUNCH, { variables: { launchId } })
  return query.case({
    error: error => <p>ERROR: {error.message}</p>,
    loading: () => <p>Loading...</p>,
    data: launch => <LaunchTile launch={launch} />
  })
})
