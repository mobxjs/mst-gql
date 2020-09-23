import { LaunchModelBase } from "./LaunchModel.base"

/* A graphql query fragment builders for LaunchModel */
export {
  selectFromLaunch,
  launchModelPrimitives,
  LaunchModelSelector
} from "./LaunchModel.base"

/**
 * LaunchModel
 */
export const LaunchModel = LaunchModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
})).views((self) => ({
  get isInCart() {
    return self.store.cartItems.includes(self.id)
  }
}))
