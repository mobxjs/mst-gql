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

### Obtaining graphql-schema

### Scaffolding

### Using the generated store and models

### Initialization transportation

### Connecting to React components with `observer`

### Using React context

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

## Tips & tricks

Should scaffolded files be generated

Fold sections in VSCode with this [extension](https://marketplace.visualstudio.com/items?itemName=maptz.regionfolder)

## Examples

## Roadmap

- [ ] offline actions
- [ ] cache query policy
- [ ] support gql-tag
- [ ] tests
- [ ] add WS example + scaffolding
- [ ] add (more) real world example
