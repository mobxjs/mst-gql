/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject } from "mst-gql"

/* #region type-imports */

/* #endregion */

/* #region type-def */

/**
 * Attack
 *
 * Represents a Pokémon's attack types
 */
const Attack = MSTGQLObject
  .named('Attack')
  .props({
    /** The name of this Pokémon attack */
    name: types.optional(types.string, ''),
    /** The type of this Pokémon attack */
    type: types.optional(types.string, ''),
    /** The damage of this Pokémon attack */
    damage: types.optional(types.integer, 0),
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

export { Attack }