import { observer } from "mobx-react"
import { useQuery } from "../src/models"

// this component declares it's own data dependencies
export const UserView = observer(({ userId }) => {
  const { error, loading, data } = useQuery(store => {
    return store.queryUser({ id: userId }, user => user.name.likes)
  })
  if (error) return error.message
  if (!data) return "Loading..."
  return (
    <>
      <strong>{data.user.name}</strong>
      <em> (likes: {data.user.likes.join(" + ")})</em>
    </>
  )
})
