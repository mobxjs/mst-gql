/* This is a mst-sql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { createStoreContext, createQueryComponent, createUseQueryHook } from "mst-gql"
import { RootStore } from "./RootStore"

export const StoreContext = createStoreContext<typeof RootStore.Type>()

export const Query = createQueryComponent(StoreContext)

export const useQuery = createUseQueryHook(StoreContext)
