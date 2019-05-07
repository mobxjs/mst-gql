import React, { Fragment } from "react"

import { Loading, Header, LaunchTile } from "../components"
import { LAUNCH_TILE_DATA } from "./launches"
import { Observer } from "mobx-react-lite";

export const GET_MY_TRIPS = `
  query GetMyTrips {
    me {
      id
      __typename
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`

export default function Profile() {
  const store = useContext(StoreContext)
  const [queryState] = useState(() => store.query(GET_MY_TRIPS)) // TODO: query with caching enabled
  return (
    <Observer>
      {() => queryState.case({
        error: error => <p>ERROR: {error.message}</p>,
        // render cached trips if available
        fetching: () => store.hasTrips ? renderTrips(store) : <Loading />
        data: () => renderTrips(store)
      })}
    </Observer>   
  )
}

function renderTrips(store) {
  return <Fragment>
            <Header>My Trips</Header>
            {store.hasTrips ? (
              store.me.trips.map(launch => (
                <LaunchTile key={launch.id} launch={launch} />
              ))
            ) : (
              <p>You haven't booked any trips</p>
            )}
          </Fragment> 
}