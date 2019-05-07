import React, { Fragment } from "react"

import { renderQuery } from "../storeContext"
import { LAUNCH_TILE_DATA } from "../models/Launch"
import { Loading, Header, LaunchDetail } from "../components"
import { ActionButton } from "../containers"

export const GET_LAUNCH_DETAILS = `
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      site
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`

export default function Launch({ launchId }) {
  return renderQuery(
    GET_LAUNCH_DETAILS,
    { launchId },
    {
      error: error => <p>ERROR: {error.message}</p>,
      fetching: () => <Loading />,
      data: launch => (
        <Fragment>
          <Header image={launch.mission.missionPatch}>
            {launch.mission.name}
          </Header>
          <LaunchDetail {...launch} />
          <ActionButton {...launch} />
        </Fragment>
      )
    }
  )
}
