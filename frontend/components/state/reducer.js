import { combineReducers } from 'redux'
// import * as types from './action-types'
import {
  ADD_ALL_TODOS,
  ADD_NEW_TODO,
  REPLACE_PATCHED_TODO,
  INPUT_CHANGE,
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
const initialTodos = [ ]
function todos(state = initialTodos, action) { // state means the todos, not app state
  switch (action.type) {
    case REPLACE_PATCHED_TODO:
      return state,map(todo => {
        return todo.id === action.payload.id
        ? action.payload
        : todo
      })
    case ADD_ALL_TODOS:
      return action.payload
    case ADD_NEW_TODO:
      // action ====> { type: ADD_NEW_TODO, payload: { id, name, completed } }
      return [...state, action.payload]
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
