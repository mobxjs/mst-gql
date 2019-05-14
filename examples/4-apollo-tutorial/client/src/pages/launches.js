import React, { Fragment, useState, useContext } from "react"
import { Observer } from "mobx-react-lite"

import { LaunchTile, Header, Button, Loading } from "../components"
import { Query } from "../models/reactUtils"

export default function Launches() {
  return (
    <Query query={store => store.fetchLaunches()}>
      {({ query }) => (
        <Fragment>
          <Header />
          {query.case({
            error: () => <p>ERROR</p>,
            loading: () => <Loading />,
            data: launchConnection => (
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
      )}
    </Query>
  )
}
