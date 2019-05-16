/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions } from "mst-gql"

import { PokemonModel, pokemonModelPrimitives, PokemonDimensionModel, pokemonDimensionModelPrimitives, PokemonAttackModel, pokemonAttackModelPrimitives, AttackModel, attackModelPrimitives, PokemonEvolutionRequirementModel, pokemonEvolutionRequirementModelPrimitives } from "./index"

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Pokemon', () => PokemonModel], ['PokemonDimension', () => PokemonDimensionModel], ['PokemonAttack', () => PokemonAttackModel], ['Attack', () => AttackModel], ['PokemonEvolutionRequirement', () => PokemonEvolutionRequirementModel]], ['Pokemon']))
  .props({
    pokemons: types.optional(types.map(types.late(() => PokemonModel)), {})
  })
  .actions(self => ({
    queryPokemons(variables: { first: number }, resultSelector = pokemonModelPrimitives, options: QueryOptions = {}) {
      return self.query<typeof PokemonModel.Type[]>(`query pokemons($first: Int!) { pokemons(first: $first) {
        ${resultSelector}
      } }`, variables, options)
    },
    queryPokemon(variables: { id: string | undefined, name: string | undefined }, resultSelector = pokemonModelPrimitives, options: QueryOptions = {}) {
      return self.query<typeof PokemonModel.Type>(`query pokemon($id: String, $name: String) { pokemon(id: $id, name: $name) {
        ${resultSelector}
      } }`, variables, options)
    },    
  }))
