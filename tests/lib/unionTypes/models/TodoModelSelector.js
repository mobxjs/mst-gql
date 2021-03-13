/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { QueryBuilder } from "mst-gql"
import { BasicTodoModelType } from "./BasicTodoModel"
import { BasicTodoModelSelector, basicTodoModelPrimitives } from "./BasicTodoModel.base"
import { FancyTodoModelType } from "./FancyTodoModel"
import { FancyTodoModelSelector, fancyTodoModelPrimitives } from "./FancyTodoModel.base"

export class TodoModelSelector extends QueryBuilder {
  basicTodo(builder) { return this.__inlineFragment(`BasicTodo`, BasicTodoModelSelector, builder) }
  fancyTodo(builder) { return this.__inlineFragment(`FancyTodo`, FancyTodoModelSelector, builder) }
}
export function selectFromTodo() {
  return new TodoModelSelector()
}

// provides all primitive fields of union member types combined together
export const todoModelPrimitives = selectFromTodo().basicTodo(basicTodoModelPrimitives).fancyTodo(fancyTodoModelPrimitives)