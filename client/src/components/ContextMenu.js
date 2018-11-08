import React from 'react'
import { Overlay } from '@blueprintjs/core'
import { css } from 'emotion'
import MapMenu from './MapMenu'
import MarkerMenu from './MarkerMenu'

const ContextMenu = ({
  isOpen,
  x = -1000,
  y = 0,
  lat,
  lng,
  onClose,
  type,
  markerId
}) => {
  return (
    <Overlay
      isOpen={isOpen}
      onClose={onClose}
      hasBackdrop={false}
      className={css`top: ${y}px; left: ${x}px; position: absolute; max-width: 200px;`}
    >
      {type === 'marker'
        ? <MarkerMenu
          onClose={onClose}
          lat={lat}
          lng={lng}
          markerId={markerId}
          />
        : <MapMenu onClose={onClose} lat={lat} lng={lng} />}
    </Overlay>
  )
}

export default ContextMenu
