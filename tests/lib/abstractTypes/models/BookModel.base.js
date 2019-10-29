/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"


/**
 * BookBaseNoRefs
 * auto generated base class for the model BookModel without refs.
 */
const BookModelBaseNoRefs = ModelBase
  .named('Book')
  .props({
    __typename: types.optional(types.literal("Book"), "Book"),
    description: types.union(types.undefined, types.string),
    author: types.union(types.undefined, types.string),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

/**
 * BookBase
 * auto generated base class for the model BookModel.
 */
export const BookModelBase = BookModelBaseNoRefs
  .props({

  })



export class BookModelSelector extends QueryBuilder {
  get description() { return this.__attr(`description`) }
  get author() { return this.__attr(`author`) }
}
export function selectFromBook() {
  return new BookModelSelector()
}

export const bookModelPrimitives = selectFromBook().description.author
