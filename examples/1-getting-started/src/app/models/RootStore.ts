import { Instance } from "mobx-state-tree"
import { RootStoreBase, RootStoreBaseRefsType } from "./RootStore.base"

/* The TypeScript type of an instance of RootStore */
export interface RootStoreType extends Instance<typeof RootStore.Type> {}
export interface RootStoreType extends RootStoreBaseRefsType {}

/* Helper function to cast self argument to a RootStore instance */
const as = (self: any) => (self as unknown) as RootStoreType

export const RootStore = RootStoreBase.actions(self => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(as(self)))
  }
}))
