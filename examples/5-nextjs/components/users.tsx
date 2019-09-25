import { observer } from "mobx-react"
import { useQuery } from "../src/models"

// this component declares it's own data dependencies, and is only rendered client-side (uses noSsr)
export const UsersView = observer(({}) => {
  const { error, data, loading, query } = useQuery(store => {
    return store.queryUsers({}, user => user.name.likes, { noSsr: true })
  })
  if (error) return error.message
  if (!data) return "Loading..."
  return (
    <>
      <ul>
        {data.users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <em> (likes: {user.likes.join(" + ")})</em>
          </li>
        ))}
      </ul>
      {loading ? (
        "Loading..."
      ) : (
        <button onClick={query!.refetch}>Refetch</button>
      )}
    </>
  )
})

// this component also declares it's own data dependencies, but is rendered server-side
// it's only rendered after the query in parent AllTodosView or DoneTodosView is done loading
export const UserPreview = observer(({ userId }) => {
  const { error, data } = useQuery(store => {
    return store.queryUser({ id: userId }, user => user.name)
  })
  if (error) return error.message
  if (!data) return "Loading..."
  return <strong>{data.user.name}</strong>
})
