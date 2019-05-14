/* This is a mst-sql generated file */

/* #region type-imports */
import { types } from "mobx-state-tree"
import gql from "graphql-tag"
import { MSTGQLStore, configureStoreMixin, QueryOptions } from "mst-gql"
import { Pokemon, pokemonPrimitives, PokemonDimension, pokemonDimensionPrimitives, PokemonAttack, pokemonAttackPrimitives, Attack, attackPrimitives, PokemonEvolutionRequirement, pokemonEvolutionRequirementPrimitives } from "./index"
/* #endregion */

/* #region type-def */
/**
* Store, managing, among others, all the objects received through graphQL
*/
const RootStore = MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['Pokemon', Pokemon], ['PokemonDimension', PokemonDimension], ['PokemonAttack', PokemonAttack], ['Attack', Attack], ['PokemonEvolutionRequirement', PokemonEvolutionRequirement]], ['Pokemon']))
  .props({
    pokemons: types.optional(types.map(Pokemon), {})
  })
  .actions(self => ({
    queryPokemons(variables: { first: number }, resultSelector = pokemonPrimitives, options: QueryOptions = {}) {
      return self.query<typeof Pokemon.Type[]>(gql`query pokemons($first: Int!) { pokemons(first: $first) {
        ${resultSelector}
      } }`, variables, options)
    },
    queryPokemon(variables: { id: string | undefined, name: string | undefined }, resultSelector = pokemonPrimitives, options: QueryOptions = {}) {
      return self.query<typeof Pokemon.Type>(gql`query pokemon($id: String, $name: String) { pokemon(id: $id, name: $name) {
        ${resultSelector}
      } }`, variables, options)
    },    
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

export { RootStore }