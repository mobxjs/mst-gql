import { FancyTodoModelBase } from "./FancyTodoModel.base"

/* A graphql query fragment builders for FancyTodoModel */
export {
  selectFromFancyTodo,
  fancyTodoModelPrimitives,
  FancyTodoModelSelector
} from "./FancyTodoModel.base"

/**
 * FancyTodoModel
 */
export const FancyTodoModel = FancyTodoModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
