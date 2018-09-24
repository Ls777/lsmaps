import React from 'react'
import { css } from 'emotion'
import { connect } from 'react-redux'
import {
  ButtonGroup,
  Button,
  Divider,
  Menu,
  MenuItem,
  MenuDivider,
  Popover
} from '@blueprintjs/core'

import NewMarkerForm from './NewMarkerForm'
import {
  openMarkerForm,
  openMapForm,
  exitSelectLocationMode
} from '../reducers/ui'
import AutoComplete from './AutoComplete'

const FileMenu = ({ openMarkerForm, openMapForm, ...props }) => (
  <Menu className={props.className}>
    <MenuItem
      text='New Marker'
      icon='document'
      {...props}
      onClick={openMapForm}
    />
    <MenuItem text='From spreadsheet' icon='folder-shared' {...props} />
    <MenuDivider />
    <MenuItem text='Save' icon='floppy-disk' {...props} />
    <MenuItem text='Save as...' icon='floppy-disk' {...props} />
    <MenuDivider />
    <MenuItem text='Exit' icon='cross' {...props} />
  </Menu>
)

const MapUi = ({
  inputRef,
  exitSelectLocationMode,
  mapCenter,
  ...menuProps
}) => (
  <div className={container}>
    <ButtonGroup className={css`flex:none;`}>
      <Button text='File' />

      <Button text='Edit' />
      <Divider />
      <Popover content={<FileMenu {...menuProps} />} position='bottom' minimal>
        <Button text='Create' />
      </Popover>
      <Button text='Delete' />
      <Divider />
      <Button icon='add' onClick={exitSelectLocationMode} />
      <Button icon='remove' />
    </ButtonGroup>
    <AutoComplete
      className={input}
      map={menuProps.map}
      google={menuProps.google}
    />
  </div>
)

const container = css`
  display: flex;
  margin-top: 10px;
  margin-left: 10px;
`

const input = css`
  flex: auto;
  margin-left: 20px;
  margin-right: 150px;
  max-width: 600px;
`

export default connect(state => ({ ui: state.ui }), {
  openMarkerForm,
  openMapForm,
  exitSelectLocationMode
})(MapUi)
