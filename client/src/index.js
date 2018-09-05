import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import store from './store'
import { Provider } from 'react-redux'

import '../node_modules/normalize.css/normalize.css'
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css'
import '../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
