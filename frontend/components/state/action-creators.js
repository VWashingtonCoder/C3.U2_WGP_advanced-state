import axios from 'axios'
import {
  INPUT_CHANGE,
  TOGGLE_DISPLAY_COMPLETEDS,
  ADD_ALL_TODOS,
  ADD_NEW_TODO,
  REPLACE_PATCHED_TODO,

} from './action-types'

// 2- ACTION CREATORS are functions that return action objects
// ACTION OBJECT is an object that has a type prop and (opt) a payload prop
// the payload must include all the info needed to recalculate app state
export const toggleDisplayCompleteds = () => {
  return { type: TOGGLE_DISPLAY_COMPLETEDS }
}
export const inputChange = ({ name, value }) => {
  return { type: INPUT_CHANGE, payload: { name, value } }
}
// the following action creators are async
// they make a call to the server, and when the data arrives,
// they dispatch actions to the reducers using that data

export const fetchAllTodos = () => dispatch => {
  axios.get('http://localhost:9000/api/todos')
    .then(res => {
      dispatch({ type: ADD_ALL_TODOS, payload: res.data.data })
    })
    .catch(err => { })
}
export const postNewTodo = name => dispatch => {
  axios.post('http://localhost:9000/api/todos', { name })
    .then(res => {
      dispatch({ type: ADD_NEW_TODO, payload: res.data.data })
    })
    .catch(err => { })
}
export const patchExistingTodo = id => dispatch => {
  axios.patch(`http://localhost:9000/api/todos/${id}`)
    .then(res => {
      dispatch({type: REPLACE_PATCHED_TODO, payload: res.data.data})
    })
    .catch(err => {

    })
}
