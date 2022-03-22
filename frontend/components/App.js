import React, { useReducer } from 'react'
import Form from './Form'
import TodoList from './TodoList'
// Redux imports
import { connect } from "react-redux"
import * as actionCreators from "../state/action-creators"

function App(props) {
  const { 
    // states
    todos, 
    displayCompleteds, 
    form,
    //action creators
    addNewTodo, 
    toggleCompleted, 
    toggleDisplayCompleteds, 
    inputChange
  } = props

  const onChange = evt => {
    const { name, value } = evt.target
    inputChange({  name, value })
  }
  const onSubmit = evt => {
    evt.preventDefault()
    addNewTodo(form.name)
  }
  const toggleShouldShow = () => {
    toggleDisplayCompleteds()
  }
  const toggleStatus = id => () => {
    toggleCompleted(id)
  }
  
  return (
    <div>
      <TodoList
        todos={todos}
        displayCompleteds={displayCompleteds}
        toggleStatus={toggleStatus}
      />
      <Form
        onSubmit={onSubmit}
        onChange={onChange}
        toggleShouldShow={toggleShouldShow}
        displayCompleteds={displayCompleteds}
        disabled={!form.name.length}
        values={form}
      />
    </div>
  )
}

export default connect(state => state, actionCreators)(App)