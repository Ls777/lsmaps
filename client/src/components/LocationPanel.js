import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
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
import MapContextMenu from './MapContextMenu'

import { enterSelectLocationMode, closeNewMarkerForm } from '../reducers/ui'
import { setFormMapPosition } from '../reducers/formmapposition'

class LocationPanel extends Component {
  handlePositionChange = e => {
    if (e.keyCode === 69) return

    console.log(e)

    const newPosition = {}
    newPosition[e.target.name] = Number(e.target.value)
    this.props.setFormMapPosition({
      ...this.props.form.formMapPosition,
      ...newPosition
    })
  }

  openDetailsPanel () {
    this.props.openPanel({
      component: DetailsPanel,
      title: 'Settings',
      props: { ...this.props }
    })
  }

  render () {
    const { form, map, google, enterSelectLocationMode } = this.props
    console.log(form.formMapPosition)
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
                type='number'
                onChange={this.handlePositionChange}
                value={form.formMapPosition.lat}
                placeholder='Latitude'
              />
              <InputGroup
                name='lng'
                type='number'
                onChange={this.handlePositionChange}
                value={form.formMapPosition.lng}
                placeholder='Longitude'
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
                this.props.closeNewMarkerForm()
              }}
            >
              Cancel
            </Button>
            <Button
              className={css`align-self: flex-end;`}
              onClick={() =>
                this.props.openPanel({
                  component: DetailsPanel,
                  title: 'Details',
                  props: { ...this.props }
                })}
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
    return this.props.render(this.props.formik)
  }
}

const className = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  margin: auto;
  width: 400px;
  padding: 40px 5vw 20px;
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
    form: state.formMapPosition
  }),
  { enterSelectLocationMode, setFormMapPosition, closeNewMarkerForm }
)(LocationPanel)
