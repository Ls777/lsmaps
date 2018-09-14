import React from 'react'
import { Overlay, Menu, MenuItem, MenuDivider, Icon } from '@blueprintjs/core'
import { css } from 'emotion'

export const MapContextMenu = ({ isOpen, x = -1000, y = 0, onClose }) => (
  <Overlay
    isOpen={isOpen}
    onClose={onClose}
    hasBackdrop={false}
    className={css`top: ${y}px; left: ${x}px; position: absolute;`}
  >
    <Menu>
      <MenuItem icon='new-text-box' text='New Marker' />
      <MenuItem icon='new-object' text='New object' />
      <MenuItem icon='new-link' text='New link' />
      <MenuDivider />
      <MenuItem
        icon='cog'
        labelElement={<Icon icon='share' />}
        text='Settings...'
      />
    </Menu>
  </Overlay>
)

export default MapContextMenu
