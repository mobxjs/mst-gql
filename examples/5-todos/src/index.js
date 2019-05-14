import * as React from "react"
import { createHttpClient } from "mst-gql"

import { render } from "react-dom"
import { TodoListView } from "./TodoListView"
import { RootStore } from "./models"

const ENDPOINT = `https://api.graphcms.com/simple/v1/cjfmozsww0sn70146fdqyuhst`

const store = RootStore.create(undefined, {
  gqlHttpClient: createHttpClient(ENDPOINT)
})

render(<TodoListView store={store} />, document.getElementById("root"))
