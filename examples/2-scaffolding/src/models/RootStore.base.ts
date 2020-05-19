/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

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


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  pokemon: ObservableMap<string, PokemonModelType>,
  attacks: ObservableMap<string, AttackModelType>
}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryPokemons="queryPokemons",
queryPokemon="queryPokemon"
}


/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Pokemon', () => PokemonModel], ['PokemonDimension', () => PokemonDimensionModel], ['PokemonAttack', () => PokemonAttackModel], ['Attack', () => AttackModel], ['PokemonEvolutionRequirement', () => PokemonEvolutionRequirementModel]], ['Pokemon', 'Attack'], "js"))
  .props({
    pokemon: types.optional(types.map(types.late((): any => PokemonModel)), {}),
    attacks: types.optional(types.map(types.late((): any => AttackModel)), {})
  })
  .actions(self => ({
    queryPokemons(variables: { first: number }, resultSelector: string | ((qb: PokemonModelSelector) => PokemonModelSelector) = pokemonModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ pokemons: PokemonModelType[]}>(`query pokemons($first: Int!) { pokemons(first: $first) {
        ${typeof resultSelector === "function" ? resultSelector(new PokemonModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryPokemon(variables: { id?: string, name?: string }, resultSelector: string | ((qb: PokemonModelSelector) => PokemonModelSelector) = pokemonModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ pokemon: PokemonModelType}>(`query pokemon($id: String, $name: String) { pokemon(id: $id, name: $name) {
        ${typeof resultSelector === "function" ? resultSelector(new PokemonModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
  })))
