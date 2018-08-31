import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import mapReducer from './reducers/map'
import markerReducer from './reducers/marker'

const reducer = combineReducers({
  map: mapReducer,
  markers: markerReducer
})

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
