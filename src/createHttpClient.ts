import { GraphQLClient } from "graphql-request"

export type HttpClientOptions = ConstructorParameters<typeof GraphQLClient>[1]

export function createHttpClient(url: string, options: HttpClientOptions = {}) {
  return new GraphQLClient(url, options)
}
