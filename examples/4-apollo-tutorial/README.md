## About

Based on the [apollo full-stack tutorial](https://github.com/apollographql/fullstack-tutorial/tree/d780ec0ceed274fdc296eebfaf20d54499e8ea31/final)

## Usage

#### 0. install `mst-gql` dependencies (within the parent `mst-gql` directory)

```bash
yarn
```

#### 1. Add `ENGINE_API_KEY`

1. Visit (https://engine.apollographql.com/)[Apollo] and create an account.
2. Create a new graph
3. grab the `ENGINE_API_KEY` they give you and add it to a `.env` file within the `server` in this example.

#### 2. Run the server

```bash
cd server
yarn
yarn start
```

#### 3. Run the client (in another terminal)

```bash
cd client
yarn
yarn start
```
