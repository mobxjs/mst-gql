/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */

/* #endregion */

/* #region fragments */
export const pokemonDimensionPrimitives = `
id
__typename
minimum
maximum
`

/* #endregion */

/* #region type-def */

/**
* PokemonDimension
 *
 * Represents a Pokémon's dimensions
*/
const PokemonDimension = MSTGQLObject
.named('PokemonDimension')
.props({
    /** The minimum value of this dimension */
    minimum: types.optional(types.string, ''),
    /** The maximum value of this dimension */
    maximum: types.optional(types.string, ''),
})
/* #endregion */

  .actions(self => ({
  // this is just an auto-generated example action. 
  // Feel free to add your own actions, props, views etc to the model. 
  // Any code outside the '#region mst-gql-*'  regions will be preserved
  log() {
    console.log(JSON.stringify(self))
  }
}))

export { PokemonDimension }