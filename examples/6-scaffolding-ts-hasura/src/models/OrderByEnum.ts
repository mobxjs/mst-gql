/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum OrderBy {
  asc="asc",
asc_nulls_first="asc_nulls_first",
asc_nulls_last="asc_nulls_last",
desc="desc",
desc_nulls_first="desc_nulls_first",
desc_nulls_last="desc_nulls_last"
}

/**
* OrderBy
*/
export const OrderByEnumType = types.enumeration("OrderBy", [
        "asc",
  "asc_nulls_first",
  "asc_nulls_last",
  "desc",
  "desc_nulls_first",
  "desc_nulls_last",
      ])
