import getId from '../helpers/getId'
import {
  ADD_NEW_TODO,
  INPUT_CHANGE,
  TOGGLE_COMPLETED,
  TOGGLE_DISPLAY_COMPLETEDS
} from '../state/action-types'

// 2- ACTION CREATORS are functions that return action objects
// ACTION OBJECT is an object that has a type prop and (opt) a payload prop
// the payload must include all the info needed to recalculate app state
export const toggleDisplayCompleteds = () => {
  return { type: TOGGLE_DISPLAY_COMPLETEDS }
}
export const inputChange = ({ name, value }) => {
  return { type: INPUT_CHANGE, payload: { name, value } }
}
export const addNewTodo = todoName => {
  return {
    type: ADD_NEW_TODO,
    payload: { name: todoName, id: getId(), completed: false },
  }
}
export const toggleCompleted = id => {
  return { type: TOGGLE_COMPLETED, payload: id }
}
