import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik, Field } from 'formik'
import { addMap } from '../reducers/map.js'

const initialValues = { name: '', url: '', description: '' }

const NewMapForm = ({ addMap }) => (
  <div>
    <h1>New Map</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        const submitObj = {}
        for (let key in values) {
          if (values[key] !== initialValues[key]) {
            submitObj[key] = values[key]
          }
        }
        addMap(submitObj)
        setTimeout(() => {
          alert(JSON.stringify(submitObj, null, 2))
          actions.setSubmitting(false)
        }, 1000)
      }}
      render={props => (
        <form onSubmit={props.handleSubmit}>
          <Field type='text' name='name' placeholder='Name' required />
          <Field type='text' name='url' placeholder='Url' />
          <Field type='text' name='description' placeholder='Description' />
          <button type='submit'>Submit</button>
        </form>
      )}
    />
    <button onClick={() => addMap({})}>
      new map
    </button>
  </div>
)

export default connect(null, { addMap })(NewMapForm)
