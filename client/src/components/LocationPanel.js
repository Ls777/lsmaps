import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
  FormGroup,
  ControlGroup,
  InputGroup,
  NumericInput,
  Button,
  H5,
  H2
} from '@blueprintjs/core'
import { css, injectGlobal } from 'emotion'

import AutoComplete from './AutoComplete'

import { enterSelectLocationMode, closeMarkerForm } from '../reducers/ui'
import { setMapPosition } from '../reducers/mapposition'

injectGlobal`
input[type='number'] {
    -moz-appearance:textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
`

class LocationPanel extends Component {
  handlePositionChange = (num, str, name) => {
    const newPosition = {}
    newPosition[name] = Number(num)
    this.props.setMapPosition({
      ...this.props.mapPosition,
      ...newPosition
    })
  }

  openDetailsPanel = () => {
    this.props.openPanel({
      component: DetailsPanel,
      title: 'Details',
      props: { ...this.props }
    })
  }

  render () {
    const { mapPosition, map, google, enterSelectLocationMode } = this.props
    console.log(mapPosition)
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
            <ControlGroup id='position'>
              <NumericInput
                name='lat'
                type='number'
                min={-85.05}
                max={85.05}
                majorStepSize={0.1}
                stepSize={0.01}
                minorStepSize={0.001}
                onValueChange={(num, str) =>
                  this.handlePositionChange(num, str, 'lat')}
                value={mapPosition.lat}
                placeholder='Latitude'
                clampValueOnBlur
                fill
              />
              <NumericInput
                name='lng'
                type='number'
                min={-180}
                max={180}
                majorStepSize={0.1}
                stepSize={0.01}
                minorStepSize={0.001}
                onValueChange={(num, str) =>
                  this.handlePositionChange(num, str, 'lng')}
                value={mapPosition.lng}
                placeholder='Longitude'
                clampValueOnBlur
                fill
              />
            </ControlGroup>
          </FormGroup>
          <div className={buttonBox}>
            <Button
              intent='danger'
              icon='small-cross'
              minimal
              onClick={() => {
                this.props.formik.handleReset()
                this.props.closeMarkerForm()
              }}
            >
              Cancel
            </Button>
            <Button
              className={css`align-self: flex-end;`}
              disabled={mapPosition.lng === '' || mapPosition.lat === ''}
              onClick={this.openDetailsPanel}
              text='Next'
              rightIcon='arrow-right'
            />
          </div>
        </div>
      </Fragment>
    )
  }
}

class DetailsPanel extends React.Component {
  render () {
    return this.props.render()
  }
}

const className = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  margin: auto;
  width: 400px;
  padding: 30px 3vw;
  h5 {
    margin: 15px auto 15px;
  }
`

const buttonBox = css`
  display: flex;
  justify-content: flex-end;
`

export default connect(
  state => ({
    mapPosition: state.mapPosition
  }),
  { enterSelectLocationMode, setMapPosition, closeMarkerForm }
)(LocationPanel)
