/* This is a mst-sql generated file */

/* #region type-imports */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"
import { RootStore } from "./RootStore"
/* #endregion */

/* #region fragments */
export const pokemonDimensionPrimitives = `
__typename
minimum
maximum
`

/* #endregion */

/* #region type-def */
export type PokemonDimensionType = typeof PokemonDimension.Type

/**
* PokemonDimension
 *
 * Represents a Pokémon's dimensions
*/
export const PokemonDimension = MSTGQLObject
  .named('PokemonDimension')
  .props({
    /** The minimum value of this dimension */
    minimum: types.optional(types.string, ''),
    /** The maximum value of this dimension */
    maximum: types.optional(types.string, ''),
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