import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import './styles/reset.css'
import './styles/styles.css'

// REDUX IMPORTS
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from "redux-thunk"
import { Provider } from 'react-redux'
import reducer from './components/state/reducer'

// there is a million ways to make the store, this is just one
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

render(
  <React.StrictMode>
    <Provider store={store}>
      <h1>Todo App</h1>
      <App />
    </Provider>
  </React.StrictMode>
  , document.getElementById('root')
)
