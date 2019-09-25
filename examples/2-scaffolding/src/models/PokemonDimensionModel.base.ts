/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, QueryBuilder } from "mst-gql"
import { RootStoreType } from "./index"


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
    minimum: types.union(types.undefined, types.null, types.string),
    /** The maximum value of this dimension */
    maximum: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class PokemonDimensionModelSelector extends QueryBuilder {
  get minimum() { return this.__attr(`minimum`) }
  get maximum() { return this.__attr(`maximum`) }
}
export function selectFromPokemonDimension() {
  return new PokemonDimensionModelSelector()
}

export const pokemonDimensionModelPrimitives = selectFromPokemonDimension().minimum.maximum
