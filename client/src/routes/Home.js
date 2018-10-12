import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { NewMapFormDialog } from '../components'
import {
  H1,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Card,
  Button,
  H2
} from '@blueprintjs/core'
import { css } from 'emotion'
import { openMapForm } from '../reducers/ui'
import { clearMap } from '../reducers/map'
import { clearUi } from '../reducers/ui'
import Header from '../components/Header'

class Home extends Component {
  constructor (props) {
    super(props)
    this.props.clearMap()
    this.props.clearUi()
  }

  render () {
    return (
      <Fragment>
        <Header />
        <div className={className}>
          <div className='title'>
            <H1>
              <div> Simple,</div>
              <div> shareable</div>
              <div>group</div>
              <div>maps.</div>
            </H1>
          </div>
          <Card className={cardClass}>
            <H2>Create your map!</H2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <Button
              onClick={() => this.props.openMapForm(false)}
              text='Create New Map'
              intent='primary'
              large
              rightIcon='plus'
            />
          </Card>
        </div>
        <NewMapFormDialog />
      </Fragment>
    )
  }
}

const className = css`
  width: 100%;
  padding: 30px 0px;
  background-image: url("https://source.unsplash.com/BkbbuOdX06A/1920x1280");
  height: 60vw; /* You must set a specified height */
  min-height: 600px;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  display: flex;
  flex-direction: column;

  .title {
    margin: 1rem 5vw;
    h1 {
      font-size: 10vw;
      line-height: 6vw;
      color: white !important;

      @media (max-width: 650px) {
        font-size: 15vw;
        line-height: 9vw;
      }
    }

  }
`

const cardClass = css`
max-width: 500px;
margin: 0px auto;
`

export default connect(null, { openMapForm, clearMap, clearUi })(Home)
