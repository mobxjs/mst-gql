/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions } from "mst-gql"

import { Pokemon, pokemonPrimitives, PokemonDimension, pokemonDimensionPrimitives, PokemonAttack, pokemonAttackPrimitives, Attack, attackPrimitives, PokemonEvolutionRequirement, pokemonEvolutionRequirementPrimitives } from "./index"

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreModel = MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Pokemon', () => Pokemon], ['PokemonDimension', () => PokemonDimension], ['PokemonAttack', () => PokemonAttack], ['Attack', () => Attack], ['PokemonEvolutionRequirement', () => PokemonEvolutionRequirement]], ['Pokemon']))
  .props({
    pokemons: types.optional(types.map(types.late(() => Pokemon)), {})
  })
  .actions(self => ({
    queryPokemons(variables: { first: number }, resultSelector = pokemonPrimitives, options: QueryOptions = {}) {
      return self.query<typeof Pokemon.Type[]>(`query pokemons($first: Int!) { pokemons(first: $first) {
        ${resultSelector}
      } }`, variables, options)
    },
    queryPokemon(variables: { id: string | undefined, name: string | undefined }, resultSelector = pokemonPrimitives, options: QueryOptions = {}) {
      return self.query<typeof Pokemon.Type>(`query pokemon($id: String, $name: String) { pokemon(id: $id, name: $name) {
        ${resultSelector}
      } }`, variables, options)
    },    
  }))
