import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import NewMapFormDialog from './NewMapFormDialog'
import {
  H1,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Card,
  Button,
  H4
} from '@blueprintjs/core'
import { css } from 'emotion'
import { openMapForm } from '../reducers/ui'
import { clearMap } from '../reducers/map'
import { clearUi } from '../reducers/ui'

class Home extends Component {
  constructor (props) {
    super(props)
    this.props.clearMap()
    this.props.clearUi()
  }

  render () {
    return (
      <Fragment>
        <Navbar className={className}>
          <div className={navBar}>
            <NavbarGroup>
              <NavbarHeading>
                <H1><span className='ls'>Ls</span>Maps</H1>
              </NavbarHeading>
              <NavbarDivider />
              <Button minimal icon='home' text='Home' />
            </NavbarGroup>
          </div>
        </Navbar>
        <Card className={cardClass}>
          <H4>Small title</H4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <Button
            onClick={this.props.openMapForm}
            text='Create New Map'
            intent='primary'
            large
            rightIcon='plus'
          />
        </Card>
        <NewMapFormDialog />
      </Fragment>
    )
  }
}

const navBar = css`
width: 600px;
margin: 0 auto;
`

const className = css`
h1 {
  margin-bottom: 0px
};
.ls {
  color: #FF4D00;
}
`

const cardClass = css`
max-width: 600px;
margin: 20px auto;
`

export default connect(null, { openMapForm, clearMap, clearUi })(Home)
