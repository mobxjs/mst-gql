import { BasicTodoModelBase } from "./BasicTodoModel.base"

/* A graphql query fragment builders for BasicTodoModel */
export {
  selectFromBasicTodo,
  basicTodoModelPrimitives,
  BasicTodoModelSelector
} from "./BasicTodoModel.base"

/**
 * BasicTodoModel
 */
export const BasicTodoModel = BasicTodoModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
