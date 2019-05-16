/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"


import { RootStore } from "./index"

/**
 * PokemonDimensionBase
 * auto generated base class for the model PokemonDimensionModel.
 *
 * Represents a Pokémon's dimensions
 */
export const PokemonDimensionModelBase = MSTGQLObject
  .named('PokemonDimension')
  .props({
    __typename: types.optional(types.literal("PokemonDimension"), "PokemonDimension"),
    /** The minimum value of this dimension */
    minimum: types.optional(types.string, ''),
    /** The maximum value of this dimension */
    maximum: types.optional(types.string, ''),
  })
  .views(self => ({
    get store() {
      return self.__getStore<typeof RootStore.Type>()
    }
  }))

export const pokemonDimensionModelPrimitives = `
__typename
minimum
maximum
`

