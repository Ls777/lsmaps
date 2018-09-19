import React, { Component, Fragment } from 'react'
import NewMapForm from './NewMapForm'
import {
  H1,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Button
} from '@blueprintjs/core'
import { css } from 'emotion'

const Home = props => (
  <Fragment>
    <Navbar>
      <NavbarGroup>
        <NavbarHeading>
          <H1 className={css`margin-bottom: 0px;`}>LsMaps</H1>
        </NavbarHeading>
        <NavbarDivider />
        <Button minimal icon='home' text='Home' />
      </NavbarGroup>
    </Navbar>
    <NewMapForm />
  </Fragment>
)

export default Home
