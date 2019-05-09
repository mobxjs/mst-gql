import * as React from 'react';
import { observer } from 'mobx-react';

export const TodoEditor = observer(
  class TodoEditor extends React.Component {
    render() {
      const { todo, onSave, onCancel, onDelete } = this.props;
      return (
        <div>
          Title:
          <input value={todo.title} onChange={this.onChangeTitle} />
          Done:
          <input type="checkbox" checked={todo.done} onChange={todo.toggle} />
          <button onClick={onSave}>Save</button>
          {onCancel && <button onClick={onCancel}>Cancel</button>}
          {onDelete && <button onClick={onDelete}>Delete</button>}
        </div>
      );
    }

    onChangeTitle = e => {
      this.props.todo.changeTitle(e.target.value);
    };
  }
);
