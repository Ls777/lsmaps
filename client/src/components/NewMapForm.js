import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik, Field } from 'formik'
import { newMap } from '../reducers/map.js'
import { withRouter, Redirect } from 'react-router-dom'

const initialValues = { name: '', url: '', description: '' }

const NewMapForm = ({ addMap, map }) => {
  if (map.id) {
    return <Redirect to={`/maps/${map.id}`} />
  }
  return (
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
          addMap(submitObj).then(r => console.log('z'))
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
    </div>
  )
}

const NewMapFormWithRouter = withRouter(NewMapForm)

export default connect(state => ({ map: state.map }), { newMap })(
  NewMapFormWithRouter
)
