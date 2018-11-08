import React from 'react'
import { Menu, MenuItem, MenuDivider, Icon } from '@blueprintjs/core'
import { connect } from 'react-redux'
import { openMarkerForm } from '../reducers/ui'
import { setMapPosition } from '../reducers/mapposition'

const MarkerMenu = ({
  setMapPosition,
  openMarkerForm,
  onClose,
  lat,
  lng,
  markerId
}) => {
  const editMarker = () => {
    setMapPosition({ lat, lng })
    openMarkerForm(true, markerId)
    onClose()
  }
  return (
    <Menu onContextMenu={e => e.preventDefault()}>
      <MenuItem icon='new-text-box' text='Edit Marker' onClick={editMarker} />
      <MenuItem
        icon='new-object'
        text='Center Map Here'
        onClick={() => setMapPosition({ lat, lng })}
      />
      <MenuDivider />
      <MenuItem text='Delete Marker' icon='floppy-disk' />
    </Menu>
  )
}

export default connect(null, { openMarkerForm, setMapPosition })(MarkerMenu)
