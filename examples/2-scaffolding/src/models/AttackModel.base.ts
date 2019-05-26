/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef, QueryBuilder } from "mst-gql"


import { RootStore } from "./index"

/**
 * AttackBase
 * auto generated base class for the model AttackModel.
 *
 * Represents a Pokémon's attack types
 */
export const AttackModelBase = MSTGQLObject
  .named('Attack')
  .props({
    __typename: types.optional(types.literal("Attack"), "Attack"),
    /** The name of this Pokémon attack */
    name: types.maybe(types.string),
    /** The type of this Pokémon attack */
    type: types.maybe(types.string),
    /** The damage of this Pokémon attack */
    damage: types.maybe(types.integer),
  })
  .views(self => ({
    get store() {
      return self.__getStore<typeof RootStore.Type>()
    }
  }))

export class AttackModelSelector extends QueryBuilder {
  get name() { return this.__attr(`name`) }
  get type() { return this.__attr(`type`) }
  get damage() { return this.__attr(`damage`) }

}

export function selectFromAttack() {
  return new AttackModelSelector()
}

export const attackModelPrimitives = selectFromAttack().name.type.damage.toString()

