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

Should scaffolded files be generated

Fold sections in VSCode with this [extension](https://marketplace.visualstudio.com/items?itemName=maptz.regionfolder)

## Examples

## Roadmap

- [ ] normalize query result set
- [ ] make sure non-roots are not stored as reference (and not normalized)
- [ ] support interfaces
- [ ] support unions
- [ ] generate more query fragments?
- [ ] auto load / auto save
- [ ] fetch tree
- [ ] generate operations from mutations?
- [ ] offline actions
- [ ] cache query policy
- [ ] support gql-tag
- [ ] tests
- [ ] add WS example + scaffolding
- [ ] add (more) real world example
- [ ] add --exclude flag to generator CLI
- [ ] use apollo client instead of grapqhl-request as back-end?
- [ ] be able to specify ownership between types
