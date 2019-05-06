/* #region mst-gql-header */
/* This file is generated using mst-gql-scaffold.js Mon, 06 May 2019 19:29:32 GMT */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

import { Attack } from "./index"
/* #endregion */

/* #region mst-gql-body */
/**
 * PokemonAttack
 *
 * Represents a Pokémon's attack types
 */
const PokemonAttack = MSTGQLObject
  .named('PokemonAttack')
  .props({
    /** The fast attacks of this Pokémon */
    fast: types.array(types.reference(Attack)),
    /** The special attacks of this Pokémon */
    special: types.array(types.reference(Attack)),
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

/* #region mst-gql-footer */
export { PokemonAttack }
/* #endregion */