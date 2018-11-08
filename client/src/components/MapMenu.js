import React from 'react'
import { Menu, MenuItem, MenuDivider, Icon } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { openMarkerForm } from '../reducers/ui'
import { setMapPosition } from '../reducers/mapposition'

const MapMenu = ({ setMapPosition, openMarkerForm, onClose, lat, lng }) => {
  const newMarker = () => {
    setMapPosition({ lat, lng })
    openMarkerForm()
    onClose()
  }
  return (
    <Menu onContextMenu={e => e.preventDefault()}>
      <MenuItem
        icon='new-text-box'
        text='New Marker Here'
        onClick={newMarker}
      />
      <MenuItem
        icon='new-object'
        text='Center Map Here'
        onClick={() => setMapPosition({ lat, lng })}
      />
      <MenuDivider />
      <MenuItem text='Edit Map Details' icon='floppy-disk' />
      <MenuItem text='Change Map Theme' icon='floppy-disk' />
      <MenuItem
        icon='cog'
        labelElement={<Icon icon='share' />}
        text='Settings...'
      />
    </Menu>
  )
}

export default connect(null, { openMarkerForm, setMapPosition })(MapMenu)
