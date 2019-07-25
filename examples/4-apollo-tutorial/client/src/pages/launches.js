import React, { Fragment } from "react"
import { observer } from "mobx-react"

import { LaunchTile, Header, Button, Loading } from "../components"
import { useQuery } from "../models/reactUtils"

export default observer(function Launches() {
  const { query } = useQuery(store => store.fetchLaunches())
  return (
    <Fragment>
      <Header />
      {query.case({
        error: () => <p>ERROR</p>,
        loading: () => <Loading />,
        data: ({ launches: launchConnection }) => (
          <Fragment>
            {launchConnection.launches.map(launch => (
              <LaunchTile key={launch.id} launch={launch} />
            ))}
            {launchConnection.isFetchingMore ? (
              <Loading />
            ) : launchConnection.hasMore ? (
              <Button
                onClick={() => {
                  launchConnection.fetchMore()
                }}
              >
                Load More
              </Button>
            ) : null}
          </Fragment>
        )
      })}
    </Fragment>
  )
})
