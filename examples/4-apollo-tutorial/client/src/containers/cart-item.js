import React from "react"

import LaunchTile from "../components/launch-tile"
import { LAUNCH_TILE_DATA } from "../pages/launches"

export const GET_LAUNCH = `
  query GetLaunch($launchId: ID!) {
    launch(id: $launchId) {
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`

export default function CartItem({ launchId }) {
  return renderQuery(
    GET_LAUNCH,
    { launchId },
    {
      // TODO: enable caching
      error: error => <p>ERROR: {error.message}</p>,
      fetching: () => <p>Loading...</p>,
      data: lauch => <LaunchTile launch={launch} />
    }
  )
}
