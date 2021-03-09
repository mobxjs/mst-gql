import { types } from "mobx-state-tree"
import { BasicTodoModel } from "./BasicTodoModel"
import { FancyTodoModel } from "./FancyTodoModel"
import { TodoListModelBase } from "./TodoListModel.base"
import { MSTGQLRef, getMSTGQLRefLabelAndId } from "mst-gql"

/* A graphql query fragment builders for TodoListModel */
export {
  selectFromTodoList,
  todoListModelPrimitives,
  TodoListModelSelector
} from "./TodoListModel.base"

/**
 * TodoListModel
 */
export const TodoListModel = TodoListModelBase.props({
  todos: types.union(
    types.undefined,
    types.array(
      types.union(
        {
          dispatcher: (ss) => {
            const modelName = ss.__typename
              ? ss.__typename
              : getMSTGQLRefLabelAndId(ss).label
            if (modelName === "FancyTodo") {
              return MSTGQLRef(
                types.late(() => FancyTodoModel),
                "FancyTodo"
              )
            } else {
              return MSTGQLRef(
                types.late(() => BasicTodoModel),
                "BasicTodo"
              )
            }
          }
        },
        MSTGQLRef(
          types.late(() => FancyTodoModel),
          "FancyTodo"
        ),
        MSTGQLRef(
          types.late(() => BasicTodoModel),
          "BasicTodo"
        )
      )
    )
  )
}).actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self))
  }
}))
