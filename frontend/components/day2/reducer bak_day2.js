import { combineReducers } from 'redux'
import getId from '../helpers/getId'
// import * as types from './action-types'
import {
  ADD_NEW_TODO,
  INPUT_CHANGE,
  TOGGLE_COMPLETED,
  TOGGLE_DISPLAY_COMPLETEDS
} from './action-types'
// one reducer function per slice of state
// we actually mash them together and export the combined reducers

// REDUCER 1, FOR THE form SLICE OF STATE
const initialForm = { name: '' }
function form(state = initialForm, action) { // state means the form, not app state
  switch (action.type) {
    case ADD_NEW_TODO:
      return initialForm
    case INPUT_CHANGE:
      // action ====> { type: INPUT_CHANGE, payload: { name, value } }
      return { ...state, [action.payload.name]: action.payload.value }
    default:
      return state
  }
}

// REDUCER 2, FOR THE todos SLICE OF STATE
const initialTodos = [
  { id: getId(), name: "Walk the dog", completed: false },
  { id: getId(), name: "Learn React", completed: true },
  { id: getId(), name: "Have fun", completed: false },
]
function todos(state = initialTodos, action) { // state means the todos, not app state
  switch (action.type) {
    case ADD_NEW_TODO:
      // action ====> { type: ADD_NEW_TODO, payload: { id, name, completed } }
      return [...state, action.payload]
    case TOGGLE_COMPLETED:
      // action ====> { type: TOGGLE_COMPLETED, payload: 23 }
      return state.map(todo => {
        return action.payload == todo.id
          ? { ...todo, completed: !todo.completed }
          : todo
      })
    default:
      return state
  }
}

// REDUCER 3, FOR THE displayCompleteds SLICE OF STATE
const initialDisplayCompleteds = true
function displayCompleteds(displayComplState = initialDisplayCompleteds, action) {
  switch (action.type) {
    case TOGGLE_DISPLAY_COMPLETEDS:
      // action ====> { type: TOGGLE_DISPLAY_COMPLETEDS }
      return !displayComplState
    default:
      return displayComplState
  }
}

export default combineReducers({ form, todos, displayCompleteds })
