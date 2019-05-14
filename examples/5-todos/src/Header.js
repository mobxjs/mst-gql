import * as React from "react"
import { observer } from "mobx-react"

import { TodoEditor } from "./TodoEditor"
import { extendObservable } from "mobx"
import { Todo } from "./models"

export const Header = observer(
  class Header extends React.Component {
    constructor(props) {
      super(props)
      extendObservable(this, {
        newTodo: this.createNewTodo()
      })
    }

    createNewTodo() {
      return Todo.create({
        id: "" + Math.random(),
        done: false,
        isPublished: false,
        title: ""
      })
    }

    render() {
      const { store } = this.props
      return (
        <div>
          Tasks left: {store.unfinishedTodoCount}
          <br />
          <button onClick={store.markAllCompleted}>Toggle all</button>
          <br />
          <TodoEditor todo={this.newTodo} onSave={this.handleCreateTodo} />
          <hr />
        </div>
      )
    }

    handleInputChange = e => {
      this.inputText = e.target.value
    }

    handleCreateTodo = () => {
      this.props.store.addTodo(this.newTodo)
      this.newTodo = this.createNewTodo()
    }
  }
)
