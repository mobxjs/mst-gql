/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PokemonAttackModel, PokemonAttackModelType } from "./PokemonAttackModel"
import { PokemonAttackModelSelector } from "./PokemonAttackModel.base"
import { PokemonDimensionModel, PokemonDimensionModelType } from "./PokemonDimensionModel"
import { PokemonDimensionModelSelector } from "./PokemonDimensionModel.base"
import { PokemonEvolutionRequirementModel, PokemonEvolutionRequirementModelType } from "./PokemonEvolutionRequirementModel"
import { PokemonEvolutionRequirementModelSelector } from "./PokemonEvolutionRequirementModel.base"
import { PokemonModel, PokemonModelType } from "./PokemonModel"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  evolutions: IObservableArray<PokemonModelType>;
}

/**
 * PokemonBase
 * auto generated base class for the model PokemonModel.
 *
 * Represents a Pokémon
 */
export const PokemonModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Pokemon')
  .props({
    __typename: types.optional(types.literal("Pokemon"), "Pokemon"),
    /** The ID of an object */
    id: types.identifier,
    /** The identifier of this Pokémon */
    number: types.union(types.undefined, types.null, types.string),
    /** The name of this Pokémon */
    name: types.union(types.undefined, types.null, types.string),
    /** The minimum and maximum weight of this Pokémon */
    weight: types.union(types.undefined, types.null, types.late((): any => PokemonDimensionModel)),
    /** The minimum and maximum weight of this Pokémon */
    height: types.union(types.undefined, types.null, types.late((): any => PokemonDimensionModel)),
    /** The classification of this Pokémon */
    classification: types.union(types.undefined, types.null, types.string),
    /** The type(s) of this Pokémon */
    types: types.union(types.undefined, types.null, types.array(types.union(types.null, types.string))),
    /** The type(s) of Pokémons that this Pokémon is resistant to */
    resistant: types.union(types.undefined, types.null, types.array(types.union(types.null, types.string))),
    /** The attacks of this Pokémon */
    attacks: types.union(types.undefined, types.null, types.late((): any => PokemonAttackModel)),
    /** The type(s) of Pokémons that this Pokémon weak to */
    weaknesses: types.union(types.undefined, types.null, types.array(types.union(types.null, types.string))),
    fleeRate: types.union(types.undefined, types.null, types.number),
    /** The maximum CP of this Pokémon */
    maxCP: types.union(types.undefined, types.null, types.integer),
    /** The evolutions of this Pokémon */
    evolutions: types.union(types.undefined, types.null, types.array(types.union(types.null, MSTGQLRef(types.late((): any => PokemonModel))))),
    /** The evolution requirements of this Pokémon */
    evolutionRequirements: types.union(types.undefined, types.null, types.late((): any => PokemonEvolutionRequirementModel)),
    /** The maximum HP of this Pokémon */
    maxHP: types.union(types.undefined, types.null, types.integer),
    image: types.union(types.undefined, types.null, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class PokemonModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get number() { return this.__attr(`number`) }
  get name() { return this.__attr(`name`) }
  get classification() { return this.__attr(`classification`) }
  get types() { return this.__attr(`types`) }
  get resistant() { return this.__attr(`resistant`) }
  get weaknesses() { return this.__attr(`weaknesses`) }
  get fleeRate() { return this.__attr(`fleeRate`) }
  get maxCP() { return this.__attr(`maxCP`) }
  get maxHP() { return this.__attr(`maxHP`) }
  get image() { return this.__attr(`image`) }
  weight(builder?: string | PokemonDimensionModelSelector | ((selector: PokemonDimensionModelSelector) => PokemonDimensionModelSelector)) { return this.__child(`weight`, PokemonDimensionModelSelector, builder) }
  height(builder?: string | PokemonDimensionModelSelector | ((selector: PokemonDimensionModelSelector) => PokemonDimensionModelSelector)) { return this.__child(`height`, PokemonDimensionModelSelector, builder) }
  attacks(builder?: string | PokemonAttackModelSelector | ((selector: PokemonAttackModelSelector) => PokemonAttackModelSelector)) { return this.__child(`attacks`, PokemonAttackModelSelector, builder) }
  evolutions(builder?: string | PokemonModelSelector | ((selector: PokemonModelSelector) => PokemonModelSelector)) { return this.__child(`evolutions`, PokemonModelSelector, builder) }
  evolutionRequirements(builder?: string | PokemonEvolutionRequirementModelSelector | ((selector: PokemonEvolutionRequirementModelSelector) => PokemonEvolutionRequirementModelSelector)) { return this.__child(`evolutionRequirements`, PokemonEvolutionRequirementModelSelector, builder) }
}
export function selectFromPokemon() {
  return new PokemonModelSelector()
}

export const pokemonModelPrimitives = selectFromPokemon().number.name.classification.types.resistant.weaknesses.fleeRate.maxCP.maxHP.image
