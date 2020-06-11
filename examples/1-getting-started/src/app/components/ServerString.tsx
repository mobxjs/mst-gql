import React from "react"
import { observer } from "mobx-react-lite"
import { useQuery } from "../models/reactUtils"

import { Error, Loading } from "./"

export const ServerString = observer(() => {
  const { loading, error, data, query } = useQuery(store =>
    store.queryStringFromServer({ string: "Todos" })
  )
  if (error) return <Error>{error.message}</Error>
  if (data) return <>{data.stringFromServer}</>
  return <Loading />
})
