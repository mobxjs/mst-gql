import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, extendObservable } from 'mobx';
import { clone, applySnapshot } from 'mobx-state-tree';

import { Header } from './Header';
import { TodoEditor } from './TodoEditor';

export const TodoListView = observer(
  class TodoListView extends React.Component {
    render() {
      const { store } = this.props;
      return (
        <div>
          <Header store={store} />
          <ul>
            {store.todos.map(todo => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>
      );
    }
  }
);

const Todo = observer(
  class Todo extends React.Component {
    clone;

    constructor(props) {
      super(props);
      extendObservable(this, { editing: false });
    }

    render() {
      const { todo } = this.props;
      return (
        <li key={todo.id}>
          {this.editing === false ? (
            <React.Fragment>
              {todo.done ? '[X]' : '[_]'} {todo.title} <button onClick={this.handleStartEdit}>✏</button>
            </React.Fragment>
          ) : (
            // <span>Show TodoEditor here</span>
            <TodoEditor
              todo={this.clone}
              onSave={this.handleTodoSave}
              onCancel={this.handleTodoCancel}
              onDelete={this.handleTodoDelete}
            />
          )}
        </li>
      );
    }

    handleStartEdit = () => {
      this.editing = true;
      this.clone = clone(this.props.todo);
    };

    handleTodoSave = () => {
      applySnapshot(this.props.todo, this.clone);
      this.editing = false;
      this.clone = null;
    };

    handleTodoCancel = () => {
      this.editing = false;
      this.clone = null;
    };

    handleTodoDelete = () => {
      this.props.todo.remove();
    };
  }
);
