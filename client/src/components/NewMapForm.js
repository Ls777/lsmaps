import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik, Field } from 'formik'
import { newMap } from '../reducers/map.js'
import { withRouter, Redirect } from 'react-router-dom'
import { Button, Card, H3 } from '@blueprintjs/core'
import { css } from 'emotion'

import * as Yup from 'yup'

import { CustomTextField, CustomTextArea } from './CommonForm'

const mapSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  url: Yup.string().url(),
  description: Yup.string()
})

const initialValues = { name: '', url: '', description: '' }

const NewMapForm = ({ newMap, map }) => {
  if (map.id) {
    return <Redirect to={`/maps/${map.id}`} />
  }
  return (
    <Card className={className}>
      <H3>New Map</H3>
      <Formik
        initialValues={initialValues}
        validationSchema={mapSchema}
        onSubmit={(values, actions) => {
          const submitObj = {}
          for (let key in values) {
            if (values[key] !== initialValues[key]) {
              submitObj[key] = values[key]
            }
          }
          newMap(submitObj).then(r => console.log(r))

          /* setTimeout(() => {
            alert(JSON.stringify(submitObj, null, 2))
            actions.setSubmitting(false)
          }, 100) */
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <CustomTextField
              name='name'
              label='Name'
              placeholder='Name'
              fill
              required
            />
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
            <Button type='submit'>Submit</Button>
          </form>
        )}
      />
    </Card>
  )
}

const className = css`
max-width: 500px;
margin: auto;
`

const NewMapFormWithRouter = withRouter(NewMapForm)

export default connect(state => ({ map: state.map }), { newMap })(
  NewMapFormWithRouter
)
