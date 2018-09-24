import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { newMarker } from '../reducers/marker.js'
import {
  enterSelectLocationMode,
  exitSelectLocationMode,
  closeMarkerForm
} from '../reducers/ui.js'

import { setMapPosition } from '../reducers/mapposition.js'

import * as Yup from 'yup'

import { Button } from '@blueprintjs/core'

import NewMarkerFormDialog from './NewMarkerFormDialog'
import { CustomTextField, CustomTextArea } from './CommonForm'

import { css } from 'emotion'

const markerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  url: Yup.string().url(),
  description: Yup.string()
})

class NewMarkerForm extends Component {
  render () {
    const {
      mapId,
      closeMarkerForm,
      ui,
      map,
      google,
      mapPosition,
      newMarker
    } = this.props

    const initialValues = {
      name: '',
      url: '',
      description: ''
    }

    const onSubmit = (values, actions) => {
      const submitObj = {}
      for (let key in values) {
        if (values[key] !== initialValues[key]) {
          submitObj[key] = values[key]
        }
      }
      submitObj.mapId = mapId
      submitObj.lat = mapPosition.lat
      submitObj.lng = mapPosition.lng

      newMarker(submitObj).then(r => console.log('z'))

      setTimeout(() => {
        alert(JSON.stringify(submitObj, null, 2))
        actions.setSubmitting(false)
        actions.resetForm()
      }, 200)
    }

    const onCancel = formik => {
      formik.handleReset()
      closeMarkerForm()
    }

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={markerSchema}
        render={formik => {
          if (ui.selectLocationMode) {
            return null
          }
          return (
            <NewMarkerFormDialog
              google={google}
              map={map}
              render={() => (
                <div>
                  <form onSubmit={formik.handleSubmit} className={className}>
                    <CustomTextField
                      name='name'
                      label='Name'
                      placeholder='Name'
                      fill
                      required
                    />
                    {formik.errors.name && formik.touched.name
                      ? <div>{formik.errors.name}</div>
                      : null}
                    <CustomTextField
                      name='url'
                      label='Website'
                      placeholder='Url'
                      fill
                    />
                    <CustomTextArea
                      name='description'
                      label='Description'
                      placeholder='Description'
                      fill
                    />
                    <div className={buttonBox}>
                      <Button
                        intent='danger'
                        icon='small-cross'
                        minimal
                        onClick={() => {
                          formik.handleReset()
                          closeMarkerForm()
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type='submit' intent='primary' rightIcon='dot'>
                        Create Marker
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            />
          )
        }}
      />
    )
  }
}

const buttonBox = css`
  display: flex;
  justify-content: flex-end;
`

const className = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  margin: auto;
  width: 400px;
  padding: 20px 3vw;
`

export default connect(
  state => ({
    mapId: state.map.id,
    ui: state.ui,
    mapPosition: state.mapPosition
  }),
  {
    newMarker,
    enterSelectLocationMode,
    exitSelectLocationMode,
    closeMarkerForm,
    setMapPosition
  }
)(NewMarkerForm)
