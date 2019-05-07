/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */
import { Attack } from "./Attack"
/* #endregion */

/* #region fragments */
export const pokemonAttackPrimitives = `
id
__typename
`

/* #endregion */

/* #region type-def */

/**
* PokemonAttack
 *
 * Represents a Pokémon's attack types
*/
const PokemonAttack = MSTGQLObject
.named('PokemonAttack')
.props({
    /** The fast attacks of this Pokémon */
    fast: types.array(types.reference(types.late(() => Attack))),
    /** The special attacks of this Pokémon */
    special: types.array(types.reference(types.late(() => Attack))),
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

export { PokemonAttack }