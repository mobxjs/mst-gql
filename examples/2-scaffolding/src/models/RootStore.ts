/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin } from "mst-gql"

/* #region type-imports */
import {
  Query,
  Pokemon,
  PokemonDimension,
  PokemonAttack,
  Attack,
  PokemonEvolutionRequirement
} from "./index"
/* #endregion */

/* #region type-def */
/**
 * Store, managing, among others, all the objects received through graphQL
 */
const RootStore = MSTGQLStore.named("RootStore")
  .extend(
    configureStoreMixin(
      [
        ["Query", Query],
        ["Pokemon", Pokemon],
        ["PokemonDimension", PokemonDimension],
        ["PokemonAttack", PokemonAttack],
        ["Attack", Attack],
        ["PokemonEvolutionRequirement", PokemonEvolutionRequirement]
      ],
      [
        "Query",
        "Pokemon",
        "PokemonDimension",
        "PokemonAttack",
        "Attack",
        "PokemonEvolutionRequirement"
      ]
    )
  )
  .props({
    querys: types.optional(types.map(Query), {}),
    pokemons: types.optional(types.map(Pokemon), {}),
    pokemondimensions: types.optional(types.map(PokemonDimension), {}),
    pokemonattacks: types.optional(types.map(PokemonAttack), {}),
    attacks: types.optional(types.map(Attack), {}),
    pokemonevolutionrequirements: types.optional(
      types.map(PokemonEvolutionRequirement),
      {}
    )
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

export { RootStore }
