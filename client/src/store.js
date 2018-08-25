import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import mapReducer from './reducers/map'

const reducer = combineReducers({
  map: mapReducer
})

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
