import React, { Component } from 'react'
import './App.css'
import MapContainer from './routes/MapContainer'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { css } from 'emotion'
import Home from './routes/Home'
import P404 from './routes/P404'

class App extends Component {
  render () {
    return (
      <Router>
        <div className={className}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route
              path='/maps/:mapId'
              render={props => (
                <MapContainer fetchId={props.match.params.mapId} />
              )}
            />
            <Route render={() => <P404 />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const className = css`
  height: 100vh;
  width: 100vw;
  margin: 0px;
`

export default App
