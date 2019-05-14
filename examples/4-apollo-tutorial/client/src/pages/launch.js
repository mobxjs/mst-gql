import React, { Fragment } from "react"
import gql from "graphql-tag"

import { Query } from "../models/reactUtils"
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

export default function Launch({ launchId }) {
  return (
    <Query query={GET_LAUNCH_DETAILS} variables={{ launchId }}>
      {({ query }) =>
        query.case({
          error: error => <p>ERROR: {error.message}</p>,
          loading: () => <Loading />,
          data: launch => (
            <Fragment>
              <Header image={launch.mission.missionPatch}>
                {launch.mission.name}
              </Header>
              <LaunchDetail {...launch} />
              <ActionButton launch={launch} />
            </Fragment>
          )
        })
      }
    </Query>
  )
}
