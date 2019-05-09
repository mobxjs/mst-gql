import { types } from 'mobx-state-tree';
import { createGQLCollectionType, createMutableGQLModel } from './GraphQLModels';

export const Todo = types.compose(
  createMutableGQLModel('Todo'),
  types
    .model('Todo', {
      title: '',
      done: false
    })
    .actions(self => ({
      toggle() {
        self.done = !self.done;
      },
      changeTitle(title) {
        self.title = title;
      }
    }))
);

export const TodoStore = types.compose(
  createGQLCollectionType('todos', Todo, 'Todo', 'allTodoes'),
  types
    .model('TodoStore', {})
    .views(self => ({
      get unfinishedTodoCount() {
        return self.todos.filter(todo => !todo.done).length;
      }
    }))
    .actions(self => ({
      markAllCompleted() {
        self.todos.forEach(todo => {
          todo.done = true;
        });
      }
    }))
);
