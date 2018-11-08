import React from 'react'
import { connect } from 'react-redux'

import { Button, Dialog, PanelStack } from '@blueprintjs/core'
import { LocationPanel } from '../components'

import { closeMarkerForm } from '../reducers/ui'

import { css } from 'emotion'

const NewMarkerFormDialog = ({
  google,
  map,
  render,
  formik,
  ui,
  markers,
  closeMarkerForm
}) => (
  <Dialog
    className={css`padding-bottom: 5px;`}
    isOpen={ui.showNewMarkerForm}
    title={ui.formEdit ? 'Edit Marker' : 'New Marker'}
    backdropClassName={css`background-color: rgba(76, 86, 100, 0.3);`}
    onClose={closeMarkerForm}
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
          render: render,
          formik: formik
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
    ui: state.ui,
    markers: state.markers
  }),
  { closeMarkerForm }
)(NewMarkerFormDialog)
