import React, { Component } from 'react'
import './App.css'
import Map from './components/Map'
import NewMapForm from './components/NewMapForm'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={NewMapForm} />
            <Route
              path='/maps/:mapId'
              render={props => <Map fetchId={props.match.params.mapId} />}
            />
            <Route render={() => <h1>404 Error</h1>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
