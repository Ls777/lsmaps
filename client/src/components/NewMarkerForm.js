import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Formik, Field } from 'formik'
import { newMarker } from '../reducers/marker.js'
import { Redirect } from 'react-router-dom'
import {
  enterSelectLocationMode,
  exitSelectLocationMode,
  closeNewMarkerForm
} from '../reducers/ui.js'

import { setFormMapPosition } from '../reducers/formmapposition'

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
  IPanel,
  TextArea
} from '@blueprintjs/core'

import AutoComplete from './AutoComplete.js'
import LocationPanel from './LocationPanel'

import { css } from 'emotion'

const initialValues = {
  name: '',
  url: '',
  description: ''
}

class NewMarkerForm extends Component {
  render () {
    const { mapId, closeNewMarkerForm, ui, map, google } = this.props

    const onSubmit = (values, actions) => {
      const submitObj = {}
      for (let key in values) {
        if (values[key] !== initialValues[key]) {
          submitObj[key] = values[key]
        }
      }
      submitObj.mapId = mapId

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
        render={formik => {
          if (ui.selectLocationMode) {
            return null
          }
          return (
            <Dialog
              isOpen={ui.showNewMarkerForm}
              title='New Marker'
              backdropClassName={css`background-color: rgba(76, 86, 100, 0.3);`}
              onClose={closeNewMarkerForm}
              canEscapeKeyClose={false}
            >
              <PanelStack
                className={panelClass}
                initialPanel={{
                  component: LocationPanel,
                  title: 'Location',
                  props: {
                    ...formik,
                    google: google,
                    map: map,
                    render: () => (
                      <div>
                        <form
                          onSubmit={formik.handleSubmit}
                          className={className}
                        >
                          <H2>Details</H2>
                          <input
                            name='name'
                            type='text'
                            placeholder='Name of Marker'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <InputGroup
                            name='url'
                            placeholder='Website'
                            value={formik.values.url}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <TextArea
                            name='description'
                            placeholder='Website'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />

                          <Button type='submit' intent='primary'>
                            Submit
                          </Button>
                        </form>
                      </div>
                    )
                  }
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

const className = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 50px;
  padding: 40px;
`

export default connect(
  state => ({
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
