import { combineReducers } from "redux"
import getId from "../helpers/getId"
import { 
    ADD_NEW_TODO, INPUT_CHANGE, TOGGLE_COMPLETED, TOGGLE_DISPLAY_COMPLETEDS 
} from "./action-types"
// import * as types from "./action-types"

// 3- REDUCER is a function that takes current state and an action object
// and returns the next state of the app
// one reducer function per slice of state
// we actually mash them together and export the combined reducers

// form state Reducer (#1)
const initialForm = {
    name: '',
    more: '',
    foo: '',
}
function form(state = initialForm, action) { //state means the form, not app state
   switch (action.type) {
       case INPUT_CHANGE:
           return { ...state, [action.payload.name]: action.payload.value }
       case ADD_NEW_TODO:
           return initialForm
       default:
           return state
   }
}

// Todos state Reducer (#2)
const initialTodos = [
    { id: getId(), name: "Walk the dog", completed: false },
    { id: getId(), name: "Learn React", completed: true },
    { id: getId(), name: "Have fun", completed: false },
]
function todos(state = initialTodos, action) {
    switch (action.type) {
        case ADD_NEW_TODO:
            return [ ...state, action.payload]
        case TOGGLE_COMPLETED:
            return state.map(todo => {
               return action.payload === todo.id ?
                {...todo, completed: !todo.completed} : todo
            })
        default:
         return state
    }
}

// Reducer 3: DisplayCompleted state
function displayCompleteds(state = true, action){
    switch (action.type) {
        case TOGGLE_DISPLAY_COMPLETEDS:
            return !state
        default:
         return state
    }
}

export default combineReducers({ form, todos, displayCompleteds })