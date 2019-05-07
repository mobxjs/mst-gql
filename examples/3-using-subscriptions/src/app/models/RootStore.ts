import { MSTGQLStore, MSTGQLObject } from "mst-gql"
import { types } from "mobx-state-tree"

const NewMessageSubQuery = `
  subscription messageSub {
    newMessages {
      __typename
      id
      from
      message
    }
  }
`

const Message = MSTGQLObject.named("message").props({
  from: types.string,
  message: types.string
})

const RootStore = MSTGQLStore.props({
  messages: types.optional(types.map(Message), {})
}).actions(self => ({
  startSubscription() {
    return self.subscribe(NewMessageSubQuery)
  }
}))

export { RootStore }
