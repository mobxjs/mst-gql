/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { QueryBuilder } from "mst-gql"
import { MessageModelSelector, messageModelPrimitives } from "./MessageModel.base"
import { UserModelSelector, userModelPrimitives } from "./UserModel.base"

export class SearchResultModelSelector extends QueryBuilder {
  user(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__inlineFragment(`User`, UserModelSelector, builder) }
  message(builder?: string | MessageModelSelector | ((selector: MessageModelSelector) => MessageModelSelector)) { return this.__inlineFragment(`Message`, MessageModelSelector, builder) }
}
export function selectFromSearchResult() {
  return new SearchResultModelSelector()
}

// provides all primitive fields of union member types combined together
export const searchResultModelPrimitives = selectFromSearchResult().user(userModelPrimitives).message(messageModelPrimitives)