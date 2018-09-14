import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import mapReducer from './reducers/map'
import markerReducer from './reducers/marker'
import uiReducer from './reducers/ui'
import formMapPositionReducer from './reducers/formmapposition'

const reducer = combineReducers({
  map: mapReducer,
  markers: markerReducer,
  ui: uiReducer,
  formMapPosition: formMapPositionReducer
})

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
