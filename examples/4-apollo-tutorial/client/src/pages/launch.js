import React, { Fragment } from "react"
import gql from "graphql-tag"
import { observer } from "mobx-react"

import { useQuery } from "../models/reactUtils"
import { LAUNCH_TILE_DATA } from "../models/"
import { Loading, Header, LaunchDetail } from "../components"
import { ActionButton } from "../containers"

export const GET_LAUNCH_DETAILS = gql`
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

export default observer(function Launch({ launchId }) {
  const { query } = useQuery(GET_LAUNCH_DETAILS, { variables: { launchId } })
  return query.case({
    error: error => <p>ERROR: {error.message}</p>,
    loading: () => <Loading />,
    data: ({ launch }) => (
      <Fragment>
        <Header image={launch.mission.missionPatch}>
          {launch.mission.name}
        </Header>
        <LaunchDetail {...launch} />
        <ActionButton launch={launch} />
      </Fragment>
    )
  })
})
