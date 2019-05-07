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
      {() =>
        queryState.case({
          error: () => <p>ERROR</p>,
          fetching: () => <Loading />,
          data: launchConnection => (
            <Fragment>
              <Header />
              {values(store.launches).map(launch => (
                <LaunchTile key={launch.id} launch={launch} />
              ))}
              {launchConnection.hasMore && (
                <Button
                  onClick={() => {
                    setQueryState(launchConnection.fetchMore())
                  }}
                >
                  Load More
                </Button>
              )}
            </Fragment>
          )
        })
      }
    </Observer>
  )
}
