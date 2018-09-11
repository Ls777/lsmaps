import React, { Component, Fragment } from 'react'
import NewMapForm from './NewMapForm'
import {
  Button,
  NumericInput,
  InputGroup,
  FormGroup,
  Card,
  Dialog,
  Spinner,
  Callout,
  Divider,
  H1,
  H2,
  NonIdealState
} from '@blueprintjs/core'

const Home = props => (
  <Fragment>
    <H1>LsMaps </H1>
    <NewMapForm />
  </Fragment>
)

export default Home
