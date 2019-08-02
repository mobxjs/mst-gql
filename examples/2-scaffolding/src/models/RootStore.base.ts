/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions } from "mst-gql"

import { PokemonModel, PokemonModelType } from "./PokemonModel"
import { pokemonModelPrimitives, PokemonModelSelector } from "./PokemonModel.base"
import { PokemonDimensionModel, PokemonDimensionModelType } from "./PokemonDimensionModel"
import { pokemonDimensionModelPrimitives, PokemonDimensionModelSelector } from "./PokemonDimensionModel.base"
import { PokemonAttackModel, PokemonAttackModelType } from "./PokemonAttackModel"
import { pokemonAttackModelPrimitives, PokemonAttackModelSelector } from "./PokemonAttackModel.base"
import { AttackModel, AttackModelType } from "./AttackModel"
import { attackModelPrimitives, AttackModelSelector } from "./AttackModel.base"
import { PokemonEvolutionRequirementModel, PokemonEvolutionRequirementModelType } from "./PokemonEvolutionRequirementModel"
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
    queryPokemons(variables: { first: number }, resultSelector: string | ((qb: PokemonModelSelector) => PokemonModelSelector) = pokemonModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ pokemons: PokemonModelType[]}>(`query pokemons($first: Int!) { pokemons(first: $first) {
        ${typeof resultSelector === "function" ? resultSelector(new PokemonModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryPokemon(variables: { id: string | undefined, name: string | undefined }, resultSelector: string | ((qb: PokemonModelSelector) => PokemonModelSelector) = pokemonModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ pokemon: PokemonModelType}>(`query pokemon($id: String, $name: String) { pokemon(id: $id, name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new PokemonModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
  }))
