import React from 'react'

import { Field } from 'formik'
import {
  Button,
  NumericInput,
  InputGroup,
  FormGroup,
  Card,
  TextArea
} from '@blueprintjs/core'

export const CustomTextField = ({
  name,
  placeholder,
  required,
  label,
  fill
}) => (
  <FormGroup
    label={label || placeholder}
    labelFor={`${name}-input`}
    labelInfo={required && '(required)'}
  >
    <Field
      type='text'
      name={name}
      render={({ field, form /* _form */ }) => (
        <InputGroup
          {...field}
          id={`${name}-input`}
          placeholder={placeholder}
          fill={fill}
          intent={form.touched[name] && form.errors[name] ? 'danger' : 'none'}
        />
      )}
    />
  </FormGroup>
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
          id={`${name}-input`}
          placeholder={placeholder}
          fill={fill}
        />
      )}
    />
  </FormGroup>
)
