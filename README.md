# mst-gql

Bindings for mobx-state-tree and GraphQL

This project can be sponsored through our [open collective](https://opencollective.com/mobx)!

Discuss this project on [spectrum](https://spectrum.chat/mst-gql)

[![OpenCollective](https://opencollective.com/mobx/backers/badge.svg)](#backers) [![OpenCollective](https://opencollective.com/mobx/sponsors/badge.svg)](#sponsors) [![CircleCI](https://circleci.com/gh/mobxjs/mst-gql/tree/master.svg?style=svg)](https://circleci.com/gh/mobxjs/mst-gql/tree/master)

# 🚀 Installation 🚀

Installation: `yarn add mobx mobx-state-tree mobx-react react react-dom mst-gql graphql-request`

If you want to use graphql tags, also install: `yarn add graphql graphql-tag`

# 👩‍🎓 Why 👩‍🎓

Watch the introduction talk @ react-europe 2019: [Data models all the way](https://www.youtube.com/watch?v=Sq2M00vghqY&list=PLCC436JpVnK3kcTnPyhcs7QnHK2PKl33D&index=12&t=0s) by [Michel Weststrate](https://twitter.com/mweststrate)

Both GraphQL and mobx-state-tree are model-first driven approaches, so they have a naturally matching architecture. If you are tired of having your data shapes defined in GraphQL, MobX-state-tree and possible TypeScript as well, this project might be a great help!

Furthermore, this project closes the gap between GraphQL and mobx-state-tree as state management solutions. GraphQL is very transport oriented, while MST is great for client side state management. GraphQL clients like apollo do support some form of client-side state, but that is still quite cumbersome compared to the full model driven power unlocked by MST, where local actions, reactive views, and MobX optimized rendering model be used.

Benefits:

- Model oriented
- Type reuse between GraphQL and MobX-state-tree
- Generates types, queries, mutations and subscription code
- Strongly typed queries, mutations, result selectors, and hooks! Auto complete all the things!
- Local views, actions, state and model life-cycles
- Automatic instance reuse
- Built-in support for local storage, caching, query caching, subscriptions (over websockets), optimistic updates
- Idiomatic store organization
- Incremental scaffolding that preserves changes

# 👟 Overview & getting started 👟

The `mst-gql` libraries consists of two parts:

1. Scaffolding
2. A runtime library

The scaffolder is a compile-time utility that generates a MST store and models based on the type information provided by your endpoint. This utility doesn't just generate models for all your types, but also query, mutation and subscription code base on the data statically available.

The runtime library is configured by the scaffolder, and provides entry points to use the generated or hand-written queries, React components, and additional utilities you want to _mixin_ to your stores.

### Scaffolding

To get started, after [installing](#-installation-) mst-gql and its dependencies, the first task is to scaffold your store and runtime models based on your graphql endpoint.

To scaffold TypeScript models based on a locally running graphQL endpoint on port 4000, run: `yarn mst-gql --format ts http://localhost:4000/graphql`. There are several additional args that can be passed to the CLI or put in a config file. Both are detailed [below](#cli).

Tip: Note that API descriptions found in the graphQL endpoint will generally end up in the generated code, so make sure to write them!

After running the scaffolder, a bunch of files will be generated in the `src/models/` directory of your project (or whatever path your provided):

_(Files marked ✏ can and should be edited. They won't be overwritten when you scaffold unless you use the `force` option.)_

- `index` - A barrel file that exposes all interesting things generated
- `RootStore.base` - A mobx-state-tree store that acts as a graphql client. Provides the following:
  - Storage for all "root" types (see below)
  - The `.query`, `.mutate` and `.subscribe` low-level api's to run graphql queries
  - Generated `.queryXXX` ,`.mutateXXX` and `.subscribeXXX` actions based on the query definitions found in your graphQL endpoint
- ✏ `RootStore` - Extends `RootStore.base` with any custom logic. This is the version we actually export and use.
- ✏ `ModelBase` - Extends mst-gql's abstract model type with any custom logic, to be inherited by every concrete model type.
- `XXXModel.base` mobx-state-tree types per type found in the graphQL endpoint. These inherit from ModelBase and expose the following things:
  - All fields will have been translated into MST equivalents
  - A `xxxPrimitives` query fragment, that can be used as selector to obtain all the primitive fields of an object type
  - (TypeScript only) a `type` that describes the runtime type of a model instance. These are useful to type parameters and react component properties
- ✏ `XXXModel` - Extends `XXXModdel.base` with any custom logic. Again, this is the version we actually use.
- `reactUtils`. This is a set of utilities to be used in React, exposing the following:
  - `StoreContext`: a strongly typed React context, that can be used to make the `RootStore` available through your app
  - `useQuery`: A react hook that can be used to render queries, mutations etc. It is bound to the `StoreContext` automatically.

The following graphQL schema will generate the store and message as shown below:

```graphql
type User {
  id: ID
  name: String!
  avatar: String!
}
type Message {
  id: ID
  user: User!
  text: String!
}
type Query {
  messages: [Message]
  message(id: ID!): Message
  me: User
}
type Subscription {
  newMessages: Message
}
type Mutation {
  changeName(id: ID!, name: String!): User
}
```

`MessageModel.base.ts` (shortened):

```typescript
export const MessageModelBase = ModelBase.named("Message").props({
  __typename: types.optional(types.literal("Message"), "Message"),
  id: types.identifier,
  user: types.union(types.undefined, MSTGQLRef(types.late(() => User))),
  text: types.union(types.undefined, types.string)
})
```

`RootStore.base.ts` (shortened):

```typescript
export const RootStoreBase = MSTGQLStore.named("RootStore")
  .props({
    messages: types.optional(types.map(types.late(() => Message)), {}),
    users: types.optional(types.map(types.late(() => User)), {})
  })
  .actions(self => ({
    queryMessages(
      variables?: {},
      resultSelector = messagePrimitives,
      options: QueryOptions = {}
    ) {
      // implementation omitted
    },
    mutateChangeName(
      variables: { id: string; name: string },
      resultSelector = userPrimitives,
      optimisticUpdate?: () => void
    ) {
      // implementation omitted
    }
  }))
```

_(Yes, that is a lot of code. A lot of code that you don't have to write 😇)_

Note that the mutations and queries are now strongly typed! The parameters will be type checked, and the return types of the query methods are correct. Nonetheless, you will often write wrapper methods around those generated actions, to, for example, define the fragments of the result set that should be retrieved.

### Initializing the store

To prepare your app to use the `RootStore`, it needs to be initialized, which is pretty straight forward, so here is quick example of what an entry file might look like:

```typescript
// 1
import React from "react"
import * as ReactDOM from "react-dom"
import "./index.css"

import { App } from "./components/App"

// 2
import { createHttpClient } from "mst-gql"
import { RootStore, StoreContext } from "./models"

// 3
const rootStore = RootStore.create(undefined, {
  gqlHttpClient: createHttpClient("http://localhost:4000/graphql")
})

// 4
ReactDOM.render(
  <StoreContext.Provider value={rootStore}>
    <App />
  </StoreContext.Provider>,
  document.getElementById("root")
)

// 5
window.store = rootStore
```

1. Typical react stuff, pretty unrelated to this library
2. Bunch of imports that are related to this lib :)
3. When starting our client, we initialize a `rootStore`, which, in typical MST fashion, takes 2 arguments:
   1. The snapshot with the initial state of the client. In this case it is `undefined`, but one could rehydrate server state here, or pick a snapshot from `localStorage`, etc.
   2. The transportation of the store. Either `gqlHttpClient`, `gqlWsClient` or both need to be provided.
4. We initialize rendering. Note that we use `StoreContext.Provider` to make the store available to the rest of the rendering three.
5. We expose the store on `window`. This has no practical use, and should be done only in DEV builds. It is a really convenient way to quickly inspect the store, or even fire actions or queries directly from the console of the browser's developer tools. (See this [talk](https://www.youtube.com/watch?v=3J9EJrvqOiM&index=7&t=0s&list=PLW0vzLDjfaNSFs7OBLK6anfQiE5FJzAPD) for some cool benefits of that)

### Loading and rendering your first data

Now, we are ready to write our first React components that use the store! Because the store is a normal MST store, like usual, `observer` based components can be used to render the contents of the store.

However, mst-gql also provides the [useQuery](#useQuery-hook) hook that can be used to track the state of an ongoing query or mutation. It can be used in many different ways (see the details below), but here is a quick example:

```typescript
import React from "react"
import { observer } from "mobx-react"

import { Error, Loading, Message } from "./"
import { useQuery } from "../models/reactUtils"

export const Home = observer(() => {
  const { store, error, loading, data } = useQuery(store =>
    store.queryMessages()
  )
  if (error) return <Error>{error.message}</Error>
  if (loading) return <Loading />
  return (
    <ul>
      {data.messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </ul>
  )
})
```

_Important: `useQuery` should always be used in combination with `observer` from the `"mobx-react"` or `"mobx-react-lite"` package! Without that, the component will not re-render automatically!_

The `useQuery` hook is imported from the generated `reactUtils`, and is bound automatically to the right store context. The first parameter, `query`, accepts many different types of arguments, but the most convenient one is to give it a callback that invokes one of the query (or your own) methods on the store. The [Query object](#query-object) returned from that action will be used to automatically update the rendering. It will also be typed correctly when used in this form.

The `useQuery` hook component returns, among other things, the `store`, `loading` and `data` fields.

If you just need access to the store, the `useContext` hook can be used: `useContext(StoreContext)`. The `StoreContext` can be imported from `reactUtils` as well.

### Mutations

Mutations work very similarly to queries. To render a mutation, the `useQuery` hook can be used again. Except, this time we start without an initial `query` parameter. We only set it once a mutation is started. For example the following component uses a custom `toggle` action that wraps a graphQL mutation:

```javascript
import * as React from "react"
import { observer } from "mobx-react"

import { useQuery } from "../models/reactUtils"

export const Todo = observer(({ todo }) => {
  const { setQuery, loading, error } = useQuery()
  return (
    <li onClick={() => setQuery(todo.toggle())}>
      <p className={`${todo.complete ? "strikethrough" : ""}`}>{todo.text}</p>
      {error && <span>Failed to update: {error}</span>}
      {loading && <span>(updating)</span>}
    </li>
  )
})
```

### Optimistic updates

The Todo model used in the above component is defined as follows:

```javascript
export const TodoModel = TodoModelBase.actions(self => ({
  toggle() {
    return self.store.mutateToggleTodo({ id: self.id }, undefined, () => {
      self.complete = !self.complete
    })
  }
}))
```

There are few things to notice:

1. Our `toggle` action wraps around the generated `mutateToggleTodo` mutation of the base model, giving us a much more convenient client api.
2. The Query object created by `mutateToggleTodo` is returned from our action, so that we can pass it (for example) to the `setQuery` as done in the previous listing.
3. We've set the third argument of the mutation, called `optimisticUpdate`. This function is executed immediately when the mutation is created, without awaiting it's result. So that the change becomes immediately visible in the UI. However, MST will record the [patches](https://github.com/mobxjs/mobx-state-tree#patches). If the mutation fails in the future, any changes made inside this `optimisticUpdate` callback will automatically be rolled back by reverse applying the recorded patches!

### Customizing the query result

Mutations and queries take as second argument a result selector, which defines which objects we want to receive back from the backend. Our `mutateToggleTodo` above leaves it to `undefined`, which defaults to querying all the shallow, primitive fields of the object (including `__typename` and `id`).

However, in the case of toggling a Todo, this is actually overfetching, as we know the text won't change by the mutation. So instead we can provide a selector to indicate that we we are only interested in the `complete` property: `"__typename id complete"`. Note that we have to include `__typename` and `id` so that mst-gql knows to which object the result should be applied!

Children can be retrieved as well by specifying them explicitly in the result selector, for example: `"__typename id complete assignee { __typename id name }`. Note that for children `__typename` and `id` (if applicable) should be selected as well!

It is possible to use `gql` from the `graphql-tag` package. This enables highlighting in some IDEs, and potentially enables static analysis.

However, the recommended way to write the result selectors is to use the query builder that mst-gql will generate for you. This querybuilder is entirely strongly typed, provides auto completion and automatically takes care of `__typename` and `id` fields. It can be used by passing a function as second argument to a mutation or query. That callback will be invoked with a querybuilder for the type of object that is returned. With the querybuilder, we could write the above mutation as:

```javascript
export const TodoModel = TodoModelBase.actions(self => ({
  toggle() {
    return self.store.mutateToggleTodo({ id: self.id }, todo => todo.complete)
  }
}))
```

To select multiple fields, simply keep "dotting", as the query is a fluent interface. For example: `user => user.firstname.lastname.avatar` selects 3 fields.

Complex children can be selected by calling the field as function, and provide a callback to that field function (which in turn is again a query builder for the appropriate type). So the following example selector selects the `timestamp` and `text` of a message. The `name` and `avatar` inside the `user` property, and finally also the `likes` properties. For the `likes` no further subselector was specified, which means that only `__typename` and `id` will be retrieved.

```javascript
// prettier-ignore
msg => msg
  .timestamp
  .text
  .user(user => user.name.avatar)
  .likes()
  .toString()
```

To create reusable query fragments, instead the following syntax can be used:

```javascript
import { selectFromMessage } from "./MessageModel.base"

// prettier-ignore
export const MESSAGE_FRAGMENT = selectFromMessage()
  .timestamp
  .text
  .user(user => user.name.avatar)
  .likes()
  .toString()
```

### Customizing generated files

You can customize all of the defined mst types: `RootStore`, `ModelBase`, and every `XXXModel`.

**However**, some files (including but not limited to `.base` files) should not be touched, as they probably need to be scaffolded again in the future.

Thanks to how MST models [compose](https://github.com/mobxjs/mobx-state-tree#creating-models), this means that you can introduce as many additional `views`, `actions` and `props` as you want to your models, by chaining more calls unto the model definitions. Those actions will often wrap around the generated methods, setting some predefined parameters, or composing the queries into bigger operations.

Example of a generated model, that introduces a `toggle` action that wraps around one of the generated mutations:

```javascript
// src/models/TodoModel.js
import { TodoModelBase } from "./TodoModel.base"

export const TodoModel = TodoModelBase.actions(self => ({
  toggle() {
    return self.store.mutateToggleTodo({ id: self.id })
  }
}))
```

That's it for the introduction! For the many different ways in which the above can applied in practice, check out the [examples](#-examples-)

### Server side rendering with react

There is an exported function called `getDataFromTree` which you can use to preload all queries, note that you must set `ssr: true` as an option in order for this to work

```js
async function preload() {
  const client = RootStore.create(undefined, {
    gqlHttpClient: createHttpClient("http://localhost:4000/graphql"),
    ssr: true
  })
  const html = await getDataFromTree(<App client={client} />, client)
  const initalState = getSnapshot(client)

  return [html, initalState]
}
```

### null vs. undefined

Because you can control what data is fetched for a model in graphql and mst-gql it is possible for a model to have some fields that have not yet been fetched from the server. This can complicate things when we're talking about a field that can also be "empty". To help with this a field in mst-gql will be `undefined` when it has not been fetched from the server and, following graphql conventions, will be `null` if the field has been fetched but is in fact empty.

---

# 🍿 In-depth store semantics 🍿

mst-gql generates model types for every object type in your graphql definition. (Except for those excluded using the `excludes` flag). For any query or mutation that is executed by the store, the returned data will be automatically, and recursively parsed into those generated MST models. This means that for any query, you get a 'rich' object back. Finding the right model type is done based on the GraphQL meta field `__typename`, so make sure to include it in your graphql queries!

The philosophy behind MST / mst-gql is that every 'business concept' should exist only once in the client state, so that there is only one source of truth for every message, usage, order, product etc. that you are holding in memory. To achieve this, it is recommended that every uniquely identifyable concept in your application, does have an `id` field of the graphQL `ID` type. By default, any object types for which this is true, is considered to be a "root type".

Root types have few features:

1. It is guaranteed that any data related to the same id will be updating the very same MST model instance.
2. All instances of root types are stored on the RootStore, for quick and easy lookups.
3. If an object is referring to a root type, a true MST `types.reference` will be used to establish the reference. This means you can use deep fields in the UI, like `message.author.name`, despite the fact that this data is stored normalized in the store.
4. Instances of the root types, and all their children, are cached automatically in the root store (until removed manually).

GraphQL has no explicit distinction between compositional and associative relationships between data types. In general, references between graphQL objects are dealt with as follows.

1. If an object is referring to a root type, a `types.reference` is used, e.g.: `author: types.reference(UserModel)`
2. If an object is not referring to a root type, but a matching MST model type exist, a composition relationship is used, for example: `comments: types.array(CommentModel)`
3. If no model type is known for the queried object type, a `types.frozen` is used, and the data as returned from the query is stored literally.

### Dealing with incomplete objects

GraphQL makes it possible to query a subset of the fields of any object. The upside of this is that data traffic can be minimized. The downside is that it cannot be guaranteed that any object is loaded in its 'complete' state. It means that fields might be missing in the client state, even though are defined as being mandatory in the original graphQL object type! To verify which keys are loaded, all models expose the `hasLoaded(fieldName:string):boolean` view, which keeps track of which fields were received at least once from the back-end.

### Query caching

As described above, (root) model instances are kept alive automatically. Beyond that, mst-gql also provides caching on the network level, based on the query string and variables, following the policies of the apollo and urql graphQL clients. The following fetch policies are supported:

- `"cache-first": Use cache if available, avoid network request if possible
- `"cache-only": Use cache if available, or error if this request was not made before
- `"cache-and-network": Use cache, but still send request and update cache in the background
- `"network-only": Skip cache, but cache the result
- `"no-cache": Skip cache, and don't cache the response either

The default policy is `cache-and-network`. This is different from other graphQL clients. But since mst-gql leverages the MobX reactivity system, this means that, possibly stale, results are shown on screen immediately if a response is in cache, and that the screen will automatically update as soon as a new server response arrives.

The query cache is actually stored in MST as well, and can be accessed through `store.__queryCache`.

Since the query cache is stored in the store, this means that mixins like `useLocalStore` will serialize them. This will help significantly in building offline-first applications.

---

# 🦄 API 🦄

## CLI

The `mst-gql` command currently accepts the following arguments:

- `--format ts|js|mjs` The type of files that need to be generated (default: `js`)
- `--outDir <dir>` The output directory of the generated files (default: `src/models`)
- `--excludes 'type1,type2,typeN'` The types that should be omitted during generation, as we are not interested in for this app.
- `--roots 'type1,type2,typeN'` The types that should be used as (root types)[#root-types]
- `--modelsOnly` Generates only models, but no queries or graphQL capabilities. This is great for backend usage, or if you want to create your own root store
- `--noReact` doesn't generate the React related utilities
- `--force` When set, exiting files will always be overridden. This will drop all customizations of model classes!
- `--dontRenameModels` By default generates model names from graphql schema types that are idiomatic Javascript/Typescript names, ie. type names will be PascalCased and root collection names camelCased. With `--dontRenameModels` the original names - as provided by the graphql schema - will be used for generating models.
- `source` The last argument is the location at which to find the graphQL definitions. This can be
  - a graphql endpoint, like `http://host/graphql`
  - a graphql files, like `schema.graphql`
  - a parsed graphql file, like `schema.json`

### Config

`mst-gql` also supports [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) as an alternative to using cli arguments.

A sample config can be found in [Example 2](https://github.com/mobxjs/mst-gql/blob/main/examples/2-scaffolding/mst-gql.config.js).

## RootStore

The generated RootStore exposes the following members:

#### `query(query, variables, options): Query`

Makes a graphQL request to the backend. The result of the query is by default automatically normalized to model instances as described above. This method is also used by all the automatically scaffolded queries.

- The `query` parameter can be a string, or a `graphql-tag` based query.
- Variables are the raw JSON data structures that should be send as variable substitutions to the backend. This parameter is optional.
- Options is an optional [QueryOptions](#queryoptions) object. The defaults are `fetchPolicy: "cache-and-network"` and `noSsr: false`
- The method returns a [`Query`](#query-object) that can be inspected to keep track of the request progress.

Be sure to at least select `__typename` and `id` in the result selector, so that mst-gql can normalize the data.

### `mutate(query, variables, optimisticUpdate): Query`

Similar to `query`, but used for mutations. If an `optimisticUpdate` thunk is passed in, that function will be immediately executed so that you can optimistically update the model. However, the patches that are generated by modifying the tree will be stored, so that, if the mutation ultimately fails, the changes can be reverted. See the [Optimistic updates](#optimistic-updates) section for more details.

### `subscribe(query, variables, onData): () => void`

Similar to `query`, but sets up an websocket based subscription. The `gqlWsClient` needs to be set during the store creation to make this possible. `onData` can be provided as callback for when new data arrives.

Example initalization:

```js
import { SubscriptionClient } from 'subscriptions-transport-ws'
``` 

build a websocket client:
```js
// see: https://www.npmjs.com/package/subscriptions-transport-ws#hybrid-websocket-transport
const gqlWsClient = new SubscriptionClient(constants.graphQlWsUri, {
  reconnect: true,
  connectionParams: {
    headers: { authorization: `Bearer ${tokenWithRoles}` },
  },
})
``` 
add the ws client when creating the store:
```js
// see: https://github.com/mobxjs/mst-gql/blob/master/src/MSTGQLStore.ts#L42-L43
const store = RootStore.create(undefined, {
  gqlHttpClient,
  gqlWsClient,
})
```

When using server side rendered tools like gatsby/next/nuxt it is necessary to prevent using subscriptions server side. An error will occur because the server is missing a websocket implementation. [See code example for gatsby](https://github.com/mobxjs/mst-gql/issues/247#issuecomment-642494006).

### Generated queries, mutations and subscriptions

Based on the queries, mutations and subscriptions defined at the endpoint, mst-gql automatically scaffolds methods for those onto the base root store.

This is very convenient, as you might not need to write any graphQL queries by hand yourself in your application. Beyond that, the queries now become strongly typed. When using TypeScript, both the `variables` and the return type of the query will be correct.

An example signature of a generated query method is:

```typescript
queryPokemons(variables: { first: number }, resultSelector = pokemonModelPrimitives, options: QueryOptions = {}): Query<PokemonModelType[]>
```

All parameters of this query are typically optional (unless some of the variables are requires, like in the above example).

The result selector defines which fields should fetched from the backend. By default mst-gql will fetch `__typename`, `ID` and all primitive fields defined in the model, but full free to override this to make more fine tuned queries! For better reuse, consider doing this in a new action on the appropiate model. For example a query to fetch all comments and likes for a message could look like:

```typescript
import { MessageBaseModel } from "./MessageModel.base"

const MessageModel = MessageBaseModel.actions(self => ({
  queryCommentsAndLikes(): Query<MessageModelType> {
    return store.queryMessage(
      { id: self.id },
      `
      id
      __typename
      comments {
        id
        __typename
        text
        likes {
          __typename
          author
        }
      }
    `
    )
  }
}))
```

### Other store methods

- Not a method, but `RootStoreType` can be used for all places in TypeScript where you need the instance type of the RootStore.
- `rawRequest(query: string, variables: any): Promise`. Makes a direct, raw, uncached, request to the graphQL server. Should typically not be needed.
- `__queryCache`. See [Query caching](#query-caching). Should typically not be needed.
- `merge(data)`. Merges a raw graphQL response into the store, and returns a new tree with model instances. See [In-depth store semantics](#in-depth-store-semantics). Should typically not be needed.

## Models

The generated models provide storage place for data returned from GraphQL, as explained [above](#in-depth-store-semantics). Beyond that, it is the place where you enrich the models, with client-side only state, actions, derived views, etc.

For convenience, each model does provide two convenience views:

- `hasLoaded(field)` returns `true` if data for the specified field was received from the server
- `store`: a strongly typed back-reference to the RootStore that loaded this model

Beyond that, the the following top-level exports are exposed from each model file:

- `xxxPrimitives`: A simple string that provides a ready-to-use selector for graphQL queries, that selects all the primitive fields. For example: `"__typename id title text done`
- `xxxModelType`: A TypeScript type definition that can be used in the application if you need to refer to the instance type of this specific model
- `selectFromXXX()`: Returns a strongly typed querybuilder that can be used to write graphql result selector fragments more easily. Don't forget to call `toString()` in the end!

## QueryOptions

```
export interface QueryOptions {
  fetchPolicy?: FetchPolicy
  noSsr?: boolean
}
```

See [Query caching](#query-caching) for more details on `fetchPolicy`. Default: `"cache-and-network"`

The `noSsr` field indicates whether the query should be executed during [Server Side Rendering](#server-side-rendering-with-react), or skipped there and only executed once the page is loaded in the browser. Default: `false`

## `createHttpClient(url: string, options: HttpClientOptions = {})`

Creates a http client for transportation purposes. For documentation of the options, see: https://github.com/prisma/graphql-request

```typescript
import { createHttpClient } from "mst-gql"
import { RootStore } from "./models/RootStore"

const gqlHttpClient = createHttpClient("http://localhost:4000/graphql")

const rootStore = RootStore.create(undefined, {
  gqlHttpClient
})
```

## Creating a websocket client

Creating a websocket client can be done by using the `subscriptions-transport-ws` package, and passing a client to the store as `gqlWsClient` environment variable:

```typescript
import { SubscriptionClient } from "subscriptions-transport-ws"

import { RootStore } from "./models/RootStore"

const gqlWsClient = new SubscriptionClient("ws://localhost:4001/graphql", {
  reconnect: true
})

const rootStore = RootStore.create(undefined, {
  gqlWsClient
})
```

## Query object

Query objects capture the state of a specific query. These objects are returned from all `query` and `mutate` actions. Query objects are fully reactive, which means that if you use them in `observer` component, or any other reactive MobX mechanism, such as `autorun` or `when`, they can be tracked.

Beyond that, query objects are also then-able, which means that you can use them as a promise. The complete type of a query object is defined as follows:

```typescript
class Query<T> implements PromiseLike<T> {
  // Whether the Query is currently fetching data from the back-end
  loading: boolean

  // The data that was fetched for this query.
  // Note that data might be available, even when the query object is still loading,
  // depending on the fetchPolicy
  data: T | undefined

  // If any error occurred, it is stored here
  error: any

  // Forces the query to re-executed and make a new roundtrip to the back-end.
  // The returned promise settles once that request is completed
  refetch = (): Promise<T> => {

  // case takes an object that should have the methods `error`, `loading` and `data`.
  // It immediately calls the appropriate handler based on the current query status.
  // Great tool to use in a reactive context, comparable with mobx-utils.fromPromise
  case<R>(handlers: {
    loading(): R
    error(error: any): R
    data(data: T): R
  }): R

  // Returns the promise for the currently ongoing request
  // (note that for example `refetch` will cause a new promise to become the current promise)
  currentPromise()

  // A short-cut to the .then handler of the current promise
  then(onResolve, onError)
```

## StoreContext

In the generated `reactUtils` you will find the `StoreContext`, which is a pre-initialized React context that can be used to distribute the RootStore through your application. It's primary benefit is that it is strongly typed, and that `Query` components will automatically pick up the store distributed by this context.

## useQuery hook

The `useQuery` hook, as found in `reactUtils` can be used to create and render queries or mutations in React.

The `useQuery` hook should always be used inside an `observer` (provided by the `mobx-react` or `mobx-react-lite` package) based component!

It accepts zero, one or 2 arguments:

- `query`, the query to execute. This parameter can take the following forms:
  - Nothing - the parameter is optional, in case you want to only set the query to be tracked later on using `setQuery`, for example when a mutation should be tracked.
  - A string, e.g. `query messages { allMessages { __typename id message date }}`
  - A `graphql-tag` based template string
  - A [`Query` object](#query-object)
  - A callback, that will receive as first argument the `store`, and should return a `Query` object. The callback will be invoked when the component is rendered for the first time, and is a great way to delegate the query logic itself to the store. This is the recommend approach. For example `store => store.queryAllMessages()`
- `options`, an object which can specify further options, such as
  - `variables`: The variables to be substituted into the graphQL query (only used if the query is specified as graphql tag or string!)
  - `fetchPolicy`: See fetch policy
  - `noSsr`: See the noSsr option of queries
  - `store`: This can be used to customize which store should be used. This can be pretty convenient for testing, as it means that no Provider needs to be used.

The query component takes a render callback, that is rendered based on the current status of the `Query` objects that is created based on the `query` property. The callback is also automatically wrapped in MobX-reacts' `observer` HoC.

The hook returns one object, with the following properties:

- `loading`
- `error`
- `data`
- `store`
- `query` - the current `Query` object
- `setQuery` - replaces the current query being rendered. This is particularly useful for mutations or loading more data

The `useQuery` hook is strongly typed; if everything is setup correctly, the type of `data` should be inferred correctly when using TypeScript.

For examples, see the sections [Loading and rendering your first data](#loading-and-rendering-your-first-data) and [Mutations](#mutations).

## `localStorageMixin`

The `localStorageMixin` can be used to automatically save the full state of the `RootStore`. By default the store is saved after every change, but throttle to be saved once per 5 seconds. (The reason for the throttling is that, although snapshotting is cheap, serializing a a snapshot to a string is expensive).

Options:

- `storage` (the storage object to use. Defaults to `window.localStorage`)
- `throttle` (in milliseconds)
- `storageKey` (the key to be used to store in the local storage).

Example:

`models/RootStore.js`

```typescript
const RootStore = RootStoreBase.extend(
  localStorageMixin({
    throttle: 1000,
    storageKey: "appFluff"
  })
)
```

### Use with react-native

To use this mixin with react-native you can pass `AsyncStorage` to the mixin using the `storage` option:

Example:

`models/RootStore.js`

```typescript
import AsyncStorage from "@react-native-community/async-storage"

const RootStore = RootStoreBase.extend(
  localStorageMixin({
    storage: AsyncStorage,
    throttle: 1000,
    storageKey: "appFluff"
  })
)
```

# 🙈 Examples 🙈

This project contains usage exampels in the `examples` directory showcasing various ways `mst-gql` can be used.

### Running the examples

1. Make sure to run `yarn` in the root directory of this project before running an example.
2. instructuoins for each example can be found in the `README.md` within the example folder.

## Overview of the examples:

### 1. Getting started

The [`1-getting-started`](examples/1-getting-started) example is a very trivial project, that shows how to use `mst-gql` together with TypeScript and React. Features:

- React
- TypeScript
- Scaffolding
- Simple query
- Simple mutation
- Customizes `TodoModel` by introduce an `toggle` action, which uses an optimistic update.
- Renders loading state

### 2. Scaffolding

The [`2-scaffolding`](examples/2-scaffolding) examples generates code for a non trivial projects and runs it through the compiler.

### 3. Twitter clone

[`3-twitter-clone`](examples/3-twitter-clone) Is the most interesting example project. Highlights:

- Shows a twitter feed using a subscription over websocket
- A load more button for paging
- Tweets can be expanded (to show replies) and liked
- It is possible to compose new tweets
- The data model has references, such as `MessageModel.user` and `MessageModel.likes`.
- `MessageModel.replyTo` is field that refers to a `MessageModel`, so that a tweet tree can be expressed.
- When changing the name of the currently logged in user, this is properly reflected in the UI, thanks to the normalization and MobX reactivity. There is non need to re-fetch the tweet wall.
- `MessageModel.isLikedByMe` introduce a client-only derived view.
- To store the message order (new messages go in front, messages inserted by loading more data are appended to the end), the `RootStore` has a property `sortedMessages` to store local state.
- All the query logic is abstracted into the models, so that the UI doesn't has as little logic as possible.
- The twitter example not only scaffolds the client side models, it also scaffolds models to be used on the server!

### 4. Apollo tutorial

[`4-apollo-tutorial`](examples/4-apollo-tutorial) is a port of the [apollo full-stack tutorial](https://github.com/apollographql/fullstack-tutorial/tree/d780ec0ceed274fdc296eebfaf20d54499e8ea31/final). Note that the example doesn't use apollo anymore. See it's readme for specific install instructions.

The examples has a lot of similarities with example 3, and also has

1. routing
2. leverages the caching policies in several views, such as switching to specific views, responding initially with cached results until fresh data is fetched
3. Uses the `localStorageMixin` so that the app can start without network requests

### 5. Next.js

[`5-nextjs`](examples/5-nextjs) an example using [next](https://nextjs.org). Highlights:

1. Server Side Rendering

# Tips & tricks

### If the result of a query doesn't show up in the store

... you might have forgotten to include `__typename` or `id` in the result selector of your string or graphql-tag based queries.

### Views is stuck is in loading state

If the view is stuck in loading state, but you can see in the network requests that you did get a proper response, you probably forget to include `observer` on the component that renders the query

### Setup prettier to ignore generated files

If you are using prettier, it is strongly recommended to make sure that the files that are generated over and over again, are not formatted, by setting up a `.prettierignore` file.

```
src/models/index.*
src/models/reactUtils.*
src/models/*.base.*
src/models/*Enum.*
```

Or, alternatively, if you want to properly format the generated files based on your standards, make sure that you always run prettier on those files after scaffolding.

### Keep components dumb

In general we recommend to keep the components dumb, and create utility functions in the store or models to perform queries needed for a certain UI component. This encourages reuse of queries between components. Furthermore, it makes testing easier, as it will be possible to test your query methods directly, without depending on rendering components. As is done for example [here](https://github.com/mobxjs/mst-gql/blob/d9d7738a53fa0daf97f6ca2522c5fd6069a2f9ae/tests/lib/todos/todostore.test.js#L18-L110)

### Paging, search state or other complex ui states

...are best modelled using separate models, or by introducing additional properties and actions to keep track of paging, offset, search filters, etcetera. This is done for example in the [twitter example](https://github.com/mobxjs/mst-gql/blob/d9d7738a53fa0daf97f6ca2522c5fd6069a2f9ae/examples/3-twitter-clone/src/app/models/RootStore.ts#L18-L56) and the [apollo example](https://github.com/mobxjs/mst-gql/blob/d9d7738a53fa0daf97f6ca2522c5fd6069a2f9ae/examples/4-apollo-tutorial/client/src/models/LaunchConnectionModel.js#L15-L32)

### Mutations should select the fields they change

Mutation should select the fields they change in the result selection

### Using mst-gql with other graphql clients

It is possible to scaffold with the `--modelsOnly` flag. This generates a RootStore and the model classes, but no code for the queries or React, and hence it is environment and transportation independent. Use this option if you want to use models on the server, or on the client in combination with another graphql client. Use `store.merge(data)` to merge in query results you get from your graphql client, and get back instantiated model objects.

### Stub the transportation layer in unit tests

It is quite easy to stub away the backend and transportation layer, by providing a custom client to the rootStore, as is done [here](https://github.com/mobxjs/mst-gql/blob/d9d7738a53fa0daf97f6ca2522c5fd6069a2f9ae/tests/lib/todos/todostore.test.js#L18-L110).
