import React from 'react'
import { css } from 'emotion'
import {
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Button
} from '@blueprintjs/core'
import Logo from '../images/Logo'
import { Link } from 'react-router-dom'

export default () => (
  <Navbar className={className}>
    <div className={navBar}>
      <NavbarGroup>
        <NavbarHeading>
          <Logo />
        </NavbarHeading>
        <NavbarDivider />
        <Link to='/'>
          <Button minimal icon='home' text='Home' />
        </Link>
      </NavbarGroup>
    </div>
  </Navbar>
)

const navBar = css`
margin: 0 2vw;
`

const className = css`
h1 {
  margin-bottom: 0px
};
.ls {
  color: #FF4D00;
}
`
