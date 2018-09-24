import React from 'react'
import { connect } from 'react-redux'
import { Overlay, Menu, MenuItem, MenuDivider, Icon } from '@blueprintjs/core'
import { openMarkerForm } from '../reducers/ui'
import { setMapPosition } from '../reducers/mapposition'
import { css } from 'emotion'

export const MapContextMenu = ({
  isOpen,
  x = -1000,
  y = 0,
  lat,
  lng,
  onClose,
  openMarkerForm,
  setMapPosition
}) => {
  const newMarker = () => {
    setMapPosition({ lat, lng })
    openMarkerForm()
    onClose()
  }
  return (
    <Overlay
      isOpen={isOpen}
      onClose={onClose}
      hasBackdrop={false}
      className={css`top: ${y}px; left: ${x}px; position: absolute;`}
    >
      <Menu>
        <MenuItem
          icon='new-text-box'
          text='New Marker Here'
          onClick={newMarker}
        />
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
}

export default connect(null, { openMarkerForm, setMapPosition })(MapContextMenu)
