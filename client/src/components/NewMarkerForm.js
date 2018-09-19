import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { newMarker } from '../reducers/marker.js'
import {
  enterSelectLocationMode,
  exitSelectLocationMode,
  closeNewMarkerForm
} from '../reducers/ui.js'

import { setMapPosition } from '../reducers/mapposition.js'

import * as Yup from 'yup'

import { Button, Dialog, PanelStack } from '@blueprintjs/core'

import LocationPanel from './LocationPanel'
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
      closeNewMarkerForm,
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
      closeNewMarkerForm()
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
            <Dialog
              className={css`padding-bottom: 5px;`}
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
                    google: google,
                    map: map,
                    render: () => (
                      <div>
                        <form
                          onSubmit={formik.handleSubmit}
                          className={className}
                        >
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
                                closeNewMarkerForm()
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              type='submit'
                              intent='primary'
                              rightIcon='dot'
                            >
                              Create Marker
                            </Button>
                          </div>
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

const buttonBox = css`
  display: flex;
  justify-content: flex-end;
`

const panelClass = css`
  height: 360px;
  margin-top: 1px;
  padding: 0px;
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
    closeNewMarkerForm,
    setMapPosition
  }
)(NewMarkerForm)
