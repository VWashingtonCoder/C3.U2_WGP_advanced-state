import React, { useReducer } from 'react'
import Form from '../Form'
import TodoList from '../TodoList'

let id = 0
const getId = () => ++id

const initialTodos = [
  { id: getId(), name: "Walk the dog", completed: false },
  { id: getId(), name: "Learn React", completed: true },
  { id: getId(), name: "Have fun", completed: false },
]

const initialForm = {
  name: '',
  more: '',
  foo: '',
}

const initialState = {
  form: initialForm,
  todos: initialTodos,
  displayCompleteds: true,
}

// 1- ACTION TYPE is a type of action that might change application state
const INPUT_CHANGE = 'INPUT_CHANGE'
const ADD_NEW_TODO = 'ADD_NEW_TODO'
const TOGGLE_COMPLETED = 'TOGGLE_COMPLETED'
const TOGGLE_DISPLAY_COMPLETEDS = 'TOGGLE_DISPLAY_COMPLETEDS'

// 2- ACTION CREATORS are functions that return action objects
// ACTION OBJECT is an object that has a type prop and (opt) a payload prop
// the payload must include all the info needed to recalculate app state
const toggleDisplayCompleteds = () => {
  return { type: TOGGLE_DISPLAY_COMPLETEDS }
}
const inputChange = ({ name, value }) => {
  return { type: INPUT_CHANGE, payload: { name, value } }
}
const addNewTodo = todoName => {
  return {
    type: ADD_NEW_TODO,
    payload: { name: todoName, id: getId(), completed: false },
  }
}
const toggleCompleted = id => {
  return { type: TOGGLE_COMPLETED, payload: id }
}

// 3- REDUCER is a function that takes current state and an action object
// and returns the next state of the app
const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_COMPLETED: {
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (action.payload === todo.id) {
            return { ...todo, completed: !todo.completed }
          }
          return todo
        })
      }
    }
    case ADD_NEW_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        form: initialForm,
      }
    case TOGGLE_DISPLAY_COMPLETEDS:
      return { ...state, displayCompleteds: !state.displayCompleteds }
    case INPUT_CHANGE: {
      // in this case the action will look like:
      // { type: 'INPUT_CHANGE', payload: { name: 'name' value: 'foo' } }
      const { form } = state
      const { name, value } = action.payload
      return { ...state, form: { ...form, [name]: value } }
    }
    // do not forget to add default
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const onChange = evt => {
    const { name, value } = evt.target
    dispatch(inputChange({ name, value }))
    // the above is equivalent to the following,
    // but less verbose, and action creators are reusable
    // dispatch({ type: 'INPUT_CHANGE', payload: { name, value }})
  }
  const onSubmit = evt => {
    evt.preventDefault()
    dispatch(addNewTodo(state.form.name))
  }
  const toggleShouldShow = () => {
    dispatch(toggleDisplayCompleteds())
  }
  const toggleStatus = id => () => {
    dispatch(toggleCompleted(id))
  }
  return (
    <div>
      <TodoList
        todos={state.todos}
        displayCompleteds={state.displayCompleteds}
        toggleStatus={toggleStatus}
      />
      <Form
        onSubmit={onSubmit}
        onChange={onChange}
        toggleShouldShow={toggleShouldShow}
        displayCompleteds={state.displayCompleteds}
        disabled={!state.form.name.length}
        values={state.form}
      />
    </div>
  )
}
