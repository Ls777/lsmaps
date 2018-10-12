import React from 'react'
import Header from '../components/Header'
import { NonIdealState, Button } from '@blueprintjs/core'
import { Link } from 'react-router-dom'

export default () => (
  <React.Fragment>
    <Header />
    <NonIdealState
      icon='home'
      title='404 Page not found'
      description="I'm sorry, this page doesn't exist. Please check your URL or return to our home page"
      action={
        <Link to='/'>
          <Button icon='home' text='Return to Home page' intent='primary' />
        </Link>
      }
    />
  </React.Fragment>
)
