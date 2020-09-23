import { RootStoreBase } from "./RootStore.base"

export const RootStore = RootStoreBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
