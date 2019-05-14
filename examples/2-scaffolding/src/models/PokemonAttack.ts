/* This is a mst-sql generated file */

/* #region type-imports */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"
import { RootStore } from "./RootStore"
import { Attack } from "./Attack"
/* #endregion */

/* #region fragments */
export const pokemonAttackPrimitives = `
__typename
`

/* #endregion */

/* #region type-def */
export type PokemonAttackType = typeof PokemonAttack.Type

/**
* PokemonAttack
 *
 * Represents a Pokémon's attack types
*/
export const PokemonAttack = MSTGQLObject
  .named('PokemonAttack')
  .props({
    /** The fast attacks of this Pokémon */
    fast: types.array(types.late(() => Attack)),
    /** The special attacks of this Pokémon */
    special: types.array(types.late(() => Attack)),
  })
  .views(self => ({
    get store() {
      return self.__getStore<typeof RootStore.Type>()
    }
  }))
/* #endregion */

  .actions(self => ({
    // This is just an auto-generated example action, which can be safely thrown away. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))