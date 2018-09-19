import React from 'react'

import { Field } from 'formik'
import { css, injectGlobal } from 'emotion'
import {
  Button,
  NumericInput,
  InputGroup,
  FormGroup,
  Card,
  TextArea
} from '@blueprintjs/core'

injectGlobal`
.bp3-form-helper-text{
  height: 0px;
  margin-bottom: -5px !important;
}
`

const className = css`
margin-bottom: 25px !important;
`

export const CustomTextField = ({
  name,
  placeholder,
  required,
  label,
  fill,
  helperText
}) => (
  <Field
    type='text'
    name={name}
    render={({ field, form /* _form */ }) => (
      <FormGroup
        className={className}
        label={label || placeholder}
        labelFor={`${name}-input`}
        labelInfo={required && '(required)'}
        helperText={
          form.errors[name] && form.touched[name] ? form.errors[name] : null
        }
        intent={form.touched[name] && form.errors[name] ? 'danger' : 'none'}
      >
        <InputGroup
          {...field}
          id={`${name}-input`}
          placeholder={placeholder}
          fill={fill}
          intent={form.touched[name] && form.errors[name] ? 'danger' : 'none'}
        />
      </FormGroup>
    )}
  />
)

export const CustomTextArea = ({
  name,
  placeholder,
  required,
  label,
  fill = false
}) => (
  <FormGroup
    label={label || placeholder}
    labelFor={`${name}-input`}
    labelInfo={required && '(required)'}
  >
    <Field
      type='text'
      name={name}
      render={({ field /* _form */ }) => (
        <TextArea
          {...field}
          className={css`resize:none;`}
          id={`${name}-input`}
          placeholder={placeholder}
          fill={fill}
        />
      )}
    />
  </FormGroup>
)
