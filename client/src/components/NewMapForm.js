import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Formik, Field } from 'formik'
import { newMap, updateMap } from '../reducers/map.js'
import { withRouter, Redirect } from 'react-router-dom'
import { Button, Card } from '@blueprintjs/core'
import { css } from 'emotion'

import * as Yup from 'yup'

import { CustomTextField, CustomTextArea } from './CommonForm'
import { closeMapForm } from '../reducers/ui'
import { editMap } from '../lib/mapService.js'

const mapSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  url: Yup.string().url(),
  description: Yup.string()
})

class NewMapForm extends Component {
  state = {
    submitSuccess: false
  }

  getInitialValues = () => {
    if (this.props.edit) {
      const initialValues = {}
      Object.entries(this.props.map).forEach(([key, value]) => {
        initialValues[key] = value === null ? '' : value
      })

      return initialValues
    }
    return { name: '', url: '', description: '' }
  }

  onSubmit = (values, actions) => {
    const initialValues = this.getInitialValues()

    const submitObj = {}

    /* for (let key in values) {
      if (values[key] !== initialValues[key]) {
        submitObj[key] = values[key]
      }
    } */

    Object.entries(values).forEach(([key, value]) => {
      if (value !== initialValues[key]) {
        submitObj[key] = value
      }
    })

    console.log(submitObj)

    const submitFunc = this.props.edit
      ? this.props.updateMap
      : this.props.newMap

    submitFunc(submitObj)
      .then(() => {
        this.setState({ submitSuccess: true })
      })
      .catch(e => console.log(e))
      .finally(() => {
        actions.setSubmitting(false)
        this.props.closeMapForm()
      })
  }

  render () {
    const { newMap, map, closeMapForm, edit } = this.props
    const initialValues = this.getInitialValues()

    if (this.state.submitSuccess) {
      return <Redirect to={`/maps/${map.id}`} />
    }
    return (
      <Card>
        <Formik
          initialValues={initialValues}
          validationSchema={mapSchema}
          onSubmit={this.onSubmit}
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
            <form onSubmit={handleSubmit} className={className}>
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
}

const className = css`
padding: 20px 5vw;
`

const NewMapFormWithRouter = withRouter(NewMapForm)

export default connect(state => ({ map: state.map }), {
  newMap,
  updateMap,
  closeMapForm
})(NewMapFormWithRouter)
