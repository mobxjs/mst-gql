/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, QueryBuilder } from "mst-gql"


import { RootStore } from "./index"

/**
 * PokemonEvolutionRequirementBase
 * auto generated base class for the model PokemonEvolutionRequirementModel.
 *
 * Represents a Pokémon's requirement to evolve
 */
export const PokemonEvolutionRequirementModelBase = MSTGQLObject
  .named('PokemonEvolutionRequirement')
  .props({
    __typename: types.optional(types.literal("PokemonEvolutionRequirement"), "PokemonEvolutionRequirement"),
    /** The amount of candy to evolve */
    amount: types.maybe(types.integer),
    /** The name of the candy to evolve */
    name: types.maybe(types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<typeof RootStore.Type>()
    }
  }))

export class PokemonEvolutionRequirementModelSelector extends QueryBuilder {
  get amount() { return this.__attr(`amount`) }
  get name() { return this.__attr(`name`) }
}
export function selectFromPokemonEvolutionRequirement() {
  return new PokemonEvolutionRequirementModelSelector()
}

export const pokemonEvolutionRequirementModelPrimitives = selectFromPokemonEvolutionRequirement().amount.name
