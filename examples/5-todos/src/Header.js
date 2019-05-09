import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import { TodoEditor } from './TodoEditor';
import { Todo } from './TodoStore';
import { extendObservable } from 'mobx';

export const Header = observer(
  class Header extends React.Component {
    constructor(props) {
      super(props);
      extendObservable(this, {
        newTodo: Todo.create()
      });
    }

    render() {
      const { store } = this.props;
      return (
        <div>
          <DevTools />
          Tasks left: {store.unfinishedTodoCount}
          <br />
          <button onClick={store.markAllCompleted}>Toggle all</button>
          <br />
          <TodoEditor todo={this.newTodo} onSave={this.handleCreateTodo} />
          <hr />
        </div>
      );
    }

    handleInputChange = e => {
      this.inputText = e.target.value;
    };

    handleCreateTodo = () => {
      this.props.store.add(this.newTodo);
      this.newTodo = Todo.create();
    };
  }
);
