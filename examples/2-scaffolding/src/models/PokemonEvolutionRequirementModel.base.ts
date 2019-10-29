/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types, Instance } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * PokemonEvolutionRequirementBaseNoRefs
 * auto generated base class for the model PokemonEvolutionRequirementModel without refs.
 *
 * Represents a Pokémon's requirement to evolve
 */
const PokemonEvolutionRequirementModelBaseNoRefs = ModelBase
  .named('PokemonEvolutionRequirement')
  .props({
    __typename: types.optional(types.literal("PokemonEvolutionRequirement"), "PokemonEvolutionRequirement"),
    /** The amount of candy to evolve */
    amount: types.union(types.undefined, types.null, types.integer),
    /** The name of the candy to evolve */
    name: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

/**
 * PokemonEvolutionRequirementBase
 * auto generated base class for the model PokemonEvolutionRequirementModel.
 *
 * Represents a Pokémon's requirement to evolve
 */
export const PokemonEvolutionRequirementModelBase: typeof PokemonEvolutionRequirementModelBaseNoRefs = PokemonEvolutionRequirementModelBaseNoRefs
  .props({

  })

export type PokemonEvolutionRequirementModelBaseRefsType = {

}


export class PokemonEvolutionRequirementModelSelector extends QueryBuilder {
  get amount() { return this.__attr(`amount`) }
  get name() { return this.__attr(`name`) }
}
export function selectFromPokemonEvolutionRequirement() {
  return new PokemonEvolutionRequirementModelSelector()
}

export const pokemonEvolutionRequirementModelPrimitives = selectFromPokemonEvolutionRequirement().amount.name
