import React, { Fragment, useState, useContext } from "react"
import { Observer } from "mobx-react-lite"
import { values } from "mobx"

import { StoreContext } from "../storeContext"
import { LaunchTile, Header, Button, Loading } from "../components"

export default function Launches() {
  const store = useContext(StoreContext)
  const [queryState, setQueryState] = useState(() => store.fetchLaunches())
  return (
    <Observer>
      {() => (
        <Fragment>
          <Header />
          {values(store.launchs).map(launch => (
            <LaunchTile key={launch.id} launch={launch} />
          ))}
          {queryState.case({
            error: () => <p>ERROR</p>,
            fetching: () => <Loading />,
            data: launchConnection =>
              launchConnection.hasMore && (
                <Button
                  onClick={() => {
                    setQueryState(launchConnection.fetchMore())
                  }}
                >
                  Load More
                </Button>
              )
          })}
        </Fragment>
      )}
    </Observer>
  )
}
