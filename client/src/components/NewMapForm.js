import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik, Field } from 'formik'
import { newMap } from '../reducers/map.js'
import { withRouter, Redirect } from 'react-router-dom'
import {
  Button,
  NumericInput,
  InputGroup,
  FormGroup,
  Card
} from '@blueprintjs/core'

import { CustomTextField } from './CommonForm'

const initialValues = { name: '', url: '', description: '' }

const NewMapForm = ({ newMap, map }) => {
  if (map.id) {
    return <Redirect to={`/maps/${map.id}`} />
  }
  return (
    <Card className='example-card'>
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
          newMap(submitObj).then(r => console.log('z'))
          setTimeout(() => {
            alert(JSON.stringify(submitObj, null, 2))
            actions.setSubmitting(false)
          }, 1000)
        }}
        render={props => (
          <form onSubmit={props.handleSubmit}>
            <CustomTextField name='name' placeholder='descript' required />
            <CustomTextField name='url' placeholder='descript' />

            <CustomTextField name='description' placeholder='descript' />
            <Button type='submit'>Submit</Button>
          </form>
        )}
      />
    </Card>
  )
}

const NewMapFormWithRouter = withRouter(NewMapForm)

export default connect(state => ({ map: state.map }), { newMap })(
  NewMapFormWithRouter
)
