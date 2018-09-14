import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Formik, Field } from 'formik'
import { newMarker } from '../reducers/marker.js'
import { Redirect } from 'react-router-dom'
import {
  enterSelectLocationMode,
  exitSelectLocationMode,
  closeNewMarkerForm,
  setFormMapPosition
} from '../reducers/ui.js'

import {
  Button,
  NumericInput,
  InputGroup,
  FormGroup,
  ControlGroup,
  Card,
  Dialog,
  H2,
  H5,
  IPanelProps,
  PanelStack,
  IPanel
} from '@blueprintjs/core'

import AutoComplete from './AutoComplete.js'
import LocationPanel from './LocationPanel'

import { css } from 'emotion'

const initialValues = {
  name: '',
  url: '',
  description: '',
  tester: ''
}

class NewMarkerForm extends Component {
  render () {
    const {
      newMarker,
      markers,
      mapId,
      enterSelectLocationMode,
      exitSelectLocationMode,
      closeNewMarkerForm,
      setFormMapPosition,
      ui,
      map,
      google
    } = this.props

    const props = this.props

    const onSubmit = (values, actions) => {
      const submitObj = {}
      for (let key in values) {
        if (values[key] !== initialValues[key]) {
          submitObj[key] = values[key]
        }
      }
      submitObj.mapId = mapId
      // newMarker(submitObj).then(r => console.log('goo'))

      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
        actions.resetForm()
      }, 200)
    }

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={formikProps => {
          if (ui.selectLocationMode) {
            return null
          }
          return (
            <Dialog
              isOpen={ui.showNewMarkerForm}
              title='New Marker'
              onClose={closeNewMarkerForm}
              canEscapeKeyClose={false}
            >
              <PanelStack
                className={panelClass}
                initialPanel={{
                  component: LocationPanel,
                  title: 'Location',
                  props: { ...formikProps, ...props }
                }}
              />
            </Dialog>
          )
        }}
      />
    )
  }
}

const panelClass = css`
  height: 360px;
  margin-top: 1px;
  padding: 10px;
`

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

export default connect(
  state => ({
    markers: state.markers,
    mapId: state.map.id,
    ui: state.ui
  }),
  {
    newMarker,
    enterSelectLocationMode,
    exitSelectLocationMode,
    closeNewMarkerForm,
    setFormMapPosition
  }
)(NewMarkerForm)
