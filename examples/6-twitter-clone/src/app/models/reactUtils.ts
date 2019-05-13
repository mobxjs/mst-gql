/* #region header */
/* This is a mst-sql generated file */
import { createStoreContext, createQueryComponent } from "mst-gql"
import { RootStore } from "./RootStore"
/* #endregion */

/* #region body */

export const StoreContext = createStoreContext<typeof RootStore.Type>()

export const Query = createQueryComponent(StoreContext)

/* #endregion */
