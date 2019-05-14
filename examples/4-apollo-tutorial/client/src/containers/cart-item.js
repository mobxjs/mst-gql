import React from "react"

import { renderQuery } from "../storeContext"

import LaunchTile from "../components/launch-tile"
import { LAUNCH_TILE_DATA } from "../models/Launch"

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
      loading: () => <p>Loading...</p>,
      data: launch => <LaunchTile launch={launch} />
    }
  )
}
