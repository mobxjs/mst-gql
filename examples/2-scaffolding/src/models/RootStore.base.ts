/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions } from "mst-gql"

import { PokemonModel } from "./PokemonModel"
import { pokemonModelPrimitives, PokemonModelSelector } from "./PokemonModel.base"
import { PokemonDimensionModel } from "./PokemonDimensionModel"
import { pokemonDimensionModelPrimitives, PokemonDimensionModelSelector } from "./PokemonDimensionModel.base"
import { PokemonAttackModel } from "./PokemonAttackModel"
import { pokemonAttackModelPrimitives, PokemonAttackModelSelector } from "./PokemonAttackModel.base"
import { AttackModel } from "./AttackModel"
import { attackModelPrimitives, AttackModelSelector } from "./AttackModel.base"
import { PokemonEvolutionRequirementModel } from "./PokemonEvolutionRequirementModel"
import { pokemonEvolutionRequirementModelPrimitives, PokemonEvolutionRequirementModelSelector } from "./PokemonEvolutionRequirementModel.base"

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Pokemon', () => PokemonModel], ['PokemonDimension', () => PokemonDimensionModel], ['PokemonAttack', () => PokemonAttackModel], ['Attack', () => AttackModel], ['PokemonEvolutionRequirement', () => PokemonEvolutionRequirementModel]], ['Pokemon', 'Attack']))
  .props({
    pokemons: types.optional(types.map(types.late(() => PokemonModel)), {}),
    attacks: types.optional(types.map(types.late(() => AttackModel)), {})
  })
  .actions(self => ({
    queryPokemons(variables: { first: number }, resultSelector: string | ((qb: PokemonModelSelector) => PokemonModelSelector) = pokemonModelPrimitives, options: QueryOptions = {}) {
      return self.query<typeof PokemonModel.Type[]>(`query pokemons($first: Int!) { pokemons(first: $first) {
        ${typeof resultSelector === "function" ? resultSelector(new PokemonModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryPokemon(variables: { id: string | undefined, name: string | undefined }, resultSelector: string | ((qb: PokemonModelSelector) => PokemonModelSelector) = pokemonModelPrimitives, options: QueryOptions = {}) {
      return self.query<typeof PokemonModel.Type>(`query pokemon($id: String, $name: String) { pokemon(id: $id, name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new PokemonModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },    
  }))
