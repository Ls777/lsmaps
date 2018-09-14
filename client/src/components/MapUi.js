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
  Popover,
  NumericInput,
  InputGroup,
  FormGroup,
  Card
} from '@blueprintjs/core'

import NewMarkerForm from './NewMarkerForm'
import { openNewMarkerForm, exitSelectLocationMode } from '../reducers/ui'
import AutoComplete from './AutoComplete'

const FileMenu = ({ openNewMarkerForm, ...props }) => (
  <Menu className={props.className}>
    <MenuItem
      text='New Marker'
      icon='document'
      {...props}
      onClick={openNewMarkerForm}
    />
    <MenuItem text='Open' icon='folder-shared' {...props} />
    <MenuItem text='Close' icon='add-to-folder' {...props} />
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
    {/* <InputGroup
      className={input}
      type='search'
      inputRef={inputRef}
      leftIcon='geolocation'
    /> */}
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

/* const input = css`
  max-width: 50%;
  margin-left: 130px;
  padding-top: 5px;
  z-index: 10;
  position: fixed;
` */

export default connect(state => ({ ui: state.ui }), {
  openNewMarkerForm,
  exitSelectLocationMode
})(MapUi)
