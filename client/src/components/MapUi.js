import React from 'react'
import { css } from 'emotion'
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

const FileMenu = props => (
  <Menu className={props.className}>
    <MenuItem text='New Marker' icon='document' {...props} />
    <MenuItem text='Open' icon='folder-shared' {...props} />
    <MenuItem text='Close' icon='add-to-folder' {...props} />
    <MenuDivider />
    <MenuItem text='Save' icon='floppy-disk' {...props} />
    <MenuItem text='Save as...' icon='floppy-disk' {...props} />
    <MenuDivider />
    <MenuItem text='Exit' icon='cross' {...props} />
  </Menu>
)

const MapUi = ({ inputRef }) => (
  <div className={container}>
    <ButtonGroup className={css`flex:none;`}>
      <Button text='File' />

      <Button text='Edit' />
      <Divider />
      <Popover content={<FileMenu />} position='bottom'>
        <Button text='Create' />
      </Popover>
      <Button text='Delete' />
      <Divider />
      <Button icon='add' />
      <Button icon='remove' />
    </ButtonGroup>
    <InputGroup
      className={input}
      type='search'
      inputRef={inputRef}
      leftIcon='geolocation'
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

export default MapUi
