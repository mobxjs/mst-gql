import React, { Fragment, useState, useContext } from "react"
import { Observer } from "mobx-react-lite"

import { StoreContext } from "../storeContext"
import { LaunchTile, Header, Button, Loading } from "../components"

export default function Launches() {
  const store = useContext(StoreContext)
  // TOOD: rewrite to renderQuery!
  const [queryState, setQueryState] = useState(() => store.fetchLaunches())
  return (
    <Observer>
      {() => (
        <Fragment>
          <Header />
          {queryState.case({
            error: () => <p>ERROR</p>,
            fetching: () => <Loading />,
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
    </Observer>
  )
}
