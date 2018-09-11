import React, { Component } from 'react'
import './App.css'
import MapContainer from './components/MapContainer'
import NewMapForm from './components/NewMapForm'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { css } from 'emotion'
import { Button, NonIdealState } from '@blueprintjs/core'
import Home from './components/Home'

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
            <Route
              render={() => (
                <NonIdealState
                  icon='home'
                  title='404 Page not found'
                  description="I'm sorry, this page doesn't exist. Please check your URL or return to our home page"
                  action={
                    <Link to='/'>
                      <Button
                        icon='home'
                        text='Return to Home page'
                        intent='primary'
                      />
                    </Link>
                  }
                />
              )}
            />
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
