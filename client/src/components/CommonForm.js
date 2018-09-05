import React from 'react'

import { Field } from 'formik'
import {
  Button,
  NumericInput,
  InputGroup,
  FormGroup,
  Card
} from '@blueprintjs/core'

export const CustomTextField = ({ name, placeholder, required, label }) => (
  <FormGroup
    label={label || placeholder}
    labelFor={`${name}-input`}
    labelInfo={required && '(required)'}
  >
    <Field
      type='text'
      name={name}
      render={({ field /* _form */ }) => (
        <InputGroup {...field} id={`${name}-input`} placeholder={placeholder} />
      )}
    />
  </FormGroup>
)
