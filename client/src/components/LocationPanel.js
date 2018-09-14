import React, { Component, Fragment } from 'react'
import {
  FormGroup,
  ControlGroup,
  InputGroup,
  Button,
  H5,
  H2
} from '@blueprintjs/core'
import { css } from 'emotion'

import AutoComplete from './AutoComplete'

class LocationPanel extends Component {
  handlePositionChange = e => {
    console.log('whats goin on')
    const newPosition = {}
    newPosition[e.target.name] = e.target.value
    console.log(e.target.name)
    console.log(e.target.value)
    console.log(newPosition)
    console.log(this.props.ui.formMapPosition)
    console.log({
      ...this.props.ui.formMapPosition,
      ...newPosition
    })
    this.props.setFormMapPosition({
      ...this.props.ui.formMapPosition,
      ...newPosition
    })
  }

  openDetailsPanel () {
    // openPanel (and closePanel) are injected by PanelStack
    this.props.openPanel({
      component: DetailsPanel, // <- class or stateless function type
      props: { enabled: true }, // <- SettingsPanel props without IPanelProps
      title: 'Settings' // <- appears in header and back button
    })
  }

  render () {
    const {
      ui,
      map,
      google,
      handleBlur,
      handleSubmit,
      enterSelectLocationMode
    } = this.props
    console.log(ui)
    return (
      <Fragment>
        <div className={className}>
          <AutoComplete map={map} google={google} />
          <H5>OR </H5>
          <Button
            type='button'
            onClick={enterSelectLocationMode}
            rightIcon='send-to-map'
          >
            Choose on Map
          </Button>
          <H5> OR </H5>
          <FormGroup
            helperText=''
            label='Direct Coodinate Entry'
            labelFor='position'
            labelInfo='(advanced)'
          >
            <ControlGroup fill id='position'>
              <InputGroup
                name='lat'
                onChange={this.handlePositionChange}
                value={ui.formMapPosition.lat}
                placeholder='Latitude'
              />
              <InputGroup
                name='lng'
                onChange={this.handlePositionChange}
                value={ui.formMapPosition.lng}
                placeholder='Longitude'
              />
            </ControlGroup>
          </FormGroup>
          <Button
            onClick={() =>
              this.props.openPanel({
                component: DetailsPanel,
                title: 'Details',
                props: this.props
              })}
            text='Next'
            rightIcon='arrow-right'
          />
        </div>

      </Fragment>
    )
  }
}

class DetailsPanel extends React.Component {
  render () {
    return (
      <div>
        <H2>Test 2</H2>
        <form onSubmit={this.props.handleSubmit} className={className}>
          <InputGroup />
          <Button type='submit' intent='primary'>
            Submit
          </Button>
        </form>
      </div>
    )
  }
}

const className = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`

export default LocationPanel
