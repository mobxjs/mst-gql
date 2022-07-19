/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum ConflictAction {
  ignore="ignore",
update="update"
}

/**
* ConflictAction
*/
export const ConflictActionEnumType = types.enumeration("ConflictAction", [
        "ignore",
  "update",
      ])
