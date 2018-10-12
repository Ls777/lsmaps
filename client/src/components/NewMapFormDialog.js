import React from 'react'
import { connect } from 'react-redux'

import { Dialog } from '@blueprintjs/core'

import { closeMapForm } from '../reducers/ui'

import { css } from 'emotion'

import { NewMapForm } from '../components'

const NewMapFormDialog = ({ ui, closeMapForm }) => (
  <Dialog
    className={css`padding-bottom: 5px;`}
    isOpen={ui.showNewMapForm}
    title={ui.formEdit ? 'Edit Map' : 'New Map'}
    backdropClassName={css`background-color: rgba(76, 86, 100, 0.3);`}
    onClose={closeMapForm}
  >
    <NewMapForm />
  </Dialog>
)

export default connect(
  state => ({
    ui: state.ui
  }),
  { closeMapForm }
)(NewMapFormDialog)
