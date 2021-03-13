/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { QueryBuilder } from "mst-gql"
import { MessageModelType } from "./MessageModel"
import { MessageModelSelector } from "./MessageModel.base"
import { UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"

export type BaseIDUnion = UserModelType | MessageModelType

export class BaseIDModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  user(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__inlineFragment(`User`, UserModelSelector, builder) }
  message(builder?: string | MessageModelSelector | ((selector: MessageModelSelector) => MessageModelSelector)) { return this.__inlineFragment(`Message`, MessageModelSelector, builder) }
}
export function selectFromBaseID() {
  return new BaseIDModelSelector()
}

export const baseIDModelPrimitives = selectFromBaseID()