import React from 'react'
import { connect } from 'react-redux'

import { Button, Dialog, PanelStack } from '@blueprintjs/core'
import LocationPanel from './LocationPanel'

import { closeNewMapForm } from '../reducers/ui'

import { css } from 'emotion'

import NewMapForm from './NewMapForm'
import NewMarkerForm from './NewMarkerForm'

const NewMapFormDialog = ({ ui, closeNewMapForm }) => (
  <Dialog
    className={css`padding-bottom: 5px;`}
    isOpen={ui.showNewMapForm}
    title='New Map'
    backdropClassName={css`background-color: rgba(76, 86, 100, 0.3);`}
    onClose={closeNewMapForm}
  >
    <NewMapForm />
  </Dialog>
)

export default connect(
  state => ({
    ui: state.ui
  }),
  { closeNewMapForm }
)(NewMapFormDialog)
