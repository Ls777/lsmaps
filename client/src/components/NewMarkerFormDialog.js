import React from 'react'
import { connect } from 'react-redux'

import { Button, Dialog, PanelStack } from '@blueprintjs/core'
import LocationPanel from './LocationPanel'

import { closeNewMarkerForm } from '../reducers/ui'

import { css } from 'emotion'

const NewMarkerFormDialog = ({
  google,
  map,
  render,
  ui,
  closeNewMarkerForm
}) => (
  <Dialog
    className={css`padding-bottom: 5px;`}
    isOpen={ui.showNewMarkerForm}
    title='New Marker'
    backdropClassName={css`background-color: rgba(76, 86, 100, 0.3);`}
    onClose={closeNewMarkerForm}
    canEscapeKeyClose={false}
  >
    <PanelStack
      className={panelClass}
      initialPanel={{
        component: LocationPanel,
        title: 'Location',
        props: {
          google: google,
          map: map,
          render: render
        }
      }}
    />
  </Dialog>
)

const panelClass = css`
  height: 360px;
  margin-top: 1px;
  padding: 0px;
`

export default connect(
  state => ({
    ui: state.ui
  }),
  { closeNewMarkerForm }
)(NewMarkerFormDialog)
