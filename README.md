# mst-gql

Bindings for mobx-state-tree and GraphQL

---

Alpha / WIP

Looking for maintainers among active GraphQL / MST users!

Why

Pro:

- model oriented
- minimal re-renders
- optimistic updates
- local extensions, state
- server reuse
- incremental code generation
- instance reuse
- reactive updates, on incoming changes

\* Con:

- over fetching risk

\* Features

- optimistic updates
- type reuse between models, TS, graphql (autocompletion)
- No components were harmed
- References
- local storage caching
- React context compatible
- subscription support

## Getting started

, { useState, useContext }

### Scaffolding

### Using the generated models in components

### Connecting to React components with `observer`

### Using the store

### Using React context

### Using built in utilities

### Simplifying queries with reflection

## Api

### MSTGQLStore

`query`

`mutate`

`subscribe`

### MSTGQLObject

### createHttpClient

### coreFields

### primitiveFields

Initialization transportation and

## Tips & tricks

Data is plain, rather than mst object -> make sure your query includes \_\_typename

Data is MST object, but not merged with the store state -> mase sure your query includes id

Should scaffolded files be generated

Fold sections in VSCode with this [extension](https://marketplace.visualstudio.com/items?itemName=maptz.regionfolder)

Withstore like in example 4

Using getters / setters in views for foreign keys

using mutations, see BookTrips component

## Examples

Before running the examples, run the following in the root directory:

```
yarn install
yarn prepare-examples
```

Basic http / mst-sql classes / optimistic update

Scaffolding

webservices, scaffolded classes

more in depth example TODO: create diff branch / MR link with the changes

## Roadmap

- [ ] implement example 5 / add prisma demo with standardized api's
- [ ] clean up readme example
- [ ] support unions (just use `types.union` from MST)
- [ ] tests
- [ ] fix tests in the examples
- [ ] rename case({fetching}) -> loading
- [ ] create PR to show diff on the apollo example
- [ ] add // prettier, eslint ignore comments
- [ ] generate generation data + mst-sql version into file headers
- [ ] useLocalStorage mixin

#### Ideas

- [ ] auto load / auto save?
- [ ] offline actions?
- [ ] use apollo client / urql instead of grapqhl-request as back-end?
- [ ] be able to specify ownership between types?
- [ ] add post run comment option to cli, to run e.g. prettier / eslint --fix ?
