/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types, Instance } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { AttackModel, AttackModelType } from "./AttackModel"
import { AttackModelSelector } from "./AttackModel.base"
import { RootStoreType } from "./index"


/**
 * PokemonAttackBaseNoRefs
 * auto generated base class for the model PokemonAttackModel without refs.
 *
 * Represents a Pokémon's attack types
 */
const PokemonAttackModelBaseNoRefs = ModelBase
  .named('PokemonAttack')
  .props({
    __typename: types.optional(types.literal("PokemonAttack"), "PokemonAttack"),

  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

/**
 * PokemonAttackBase
 * auto generated base class for the model PokemonAttackModel.
 *
 * Represents a Pokémon's attack types
 */
export const PokemonAttackModelBase: typeof PokemonAttackModelBaseNoRefs = PokemonAttackModelBaseNoRefs
  .props({
    /** The fast attacks of this Pokémon */
    fast: types.union(types.undefined, types.null, types.array(types.union(types.null, MSTGQLRef(types.late(() => AttackModel))))),
    /** The special attacks of this Pokémon */
    special: types.union(types.undefined, types.null, types.array(types.union(types.null, MSTGQLRef(types.late(() => AttackModel))))),
  })

export type PokemonAttackModelBaseRefsType = {
  fast: IObservableArray<AttackModelType>,
  special: IObservableArray<AttackModelType>,
}


export class PokemonAttackModelSelector extends QueryBuilder {
  fast(builder?: string | AttackModelSelector | ((selector: AttackModelSelector) => AttackModelSelector)) { return this.__child(`fast`, AttackModelSelector, builder) }
  special(builder?: string | AttackModelSelector | ((selector: AttackModelSelector) => AttackModelSelector)) { return this.__child(`special`, AttackModelSelector, builder) }
}
export function selectFromPokemonAttack() {
  return new PokemonAttackModelSelector()
}

export const pokemonAttackModelPrimitives = selectFromPokemonAttack()
