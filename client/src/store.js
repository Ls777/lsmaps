import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import mapReducer from './reducers/map'
import markerReducer from './reducers/marker'
import uiReducer from './reducers/ui'

const reducer = combineReducers({
  map: mapReducer,
  markers: markerReducer,
  ui: uiReducer
})

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
