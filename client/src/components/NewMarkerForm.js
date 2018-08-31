import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik, Field } from 'formik'
import { newMarker } from '../reducers/marker.js'
import { Redirect } from 'react-router-dom'
import GeoAutocomplete from './GeoAutocomplete'

const initialValues = { name: '', url: '', description: '' }

const NewMarkerForm = ({ newMarker, markers, mapId }) => (
  <div>
    <h1>New Marker</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        const submitObj = {}
        for (let key in values) {
          if (values[key] !== initialValues[key]) {
            submitObj[key] = values[key]
          }
        }
        submitObj.mapId = mapId
        newMarker(submitObj).then(r => console.log('goo'))
        setTimeout(() => {
          alert(JSON.stringify(submitObj, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}
      render={props => (
        <form onSubmit={props.handleSubmit}>
          <Field type='text' name='name' placeholder='Name' required />
          <Field type='number' name='lat' placeholder='latitude' required />
          <Field type='number' name='lng' placeholder='longitude' required />
          <Field type='text' name='url' placeholder='Url' />
          <Field type='text' name='description' placeholder='Description' />
          <button type='submit'>Submit</button>
        </form>
      )}
    />
  </div>
)

export default connect(
  state => ({ markers: state.markers, mapId: state.map.id }),
  { newMarker }
)(NewMarkerForm)
