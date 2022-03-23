import React from 'react'
import Form from './Form'
import TodoList from './TodoList'
// REDUX IMPORTS
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

function App(props) {
  const {
    // states
    todos,
    form,
    displayCompleteds,
    // action creators
    toggleDisplayCompleteds,
    inputChange,
    addNewTodo,
    toggleCompleted,
    
  } = props
  const onChange = evt => {
    const { name, value } = evt.target
    inputChange({ name, value })
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

const mapStateToProps = state => {
  return {
    // maybe the component does not need all slices of state
    todos: state.todos,
    form: state.form,
    displayCompleteds: state.displayCompleteds,
  }
}

export default connect(mapStateToProps, actionCreators)(App)
