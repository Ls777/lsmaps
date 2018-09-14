import React, { Fragment } from 'react'
import { InfoWindow } from 'google-maps-react'
import { H1, H2, H3, Popover, Button } from '@blueprintjs/core'
import { css, injectGlobal } from 'emotion'

const MarkerInfo = props => {
  const { infoWindowMarker, infoWindowMarkerId } = props.ui

  let marker = {}

  if (infoWindowMarker !== null) {
    marker = props.markers.filter(el => el.id === infoWindowMarkerId)[0]
  }

  return (
    <InfoWindow
      {...props}
      className='infowindow'
      visible={infoWindowMarker !== null}
      marker={infoWindowMarker}
      onClose={props.closeInfoWindow}
    >
      <Fragment>
        {infoWindowMarker &&
          <div className={className}>
            <H3>{marker.name}</H3>
            {marker.url &&
              <a
                className='bp3-text-large'
                href={`//${marker.url}`}
                target='_blank'
              >
                Link
              </a>}
            {marker.description && <p>{marker.description}</p>}
          </div>}
      </Fragment>

    </InfoWindow>
  )
}

const className = css`
  color: black;
`

export default MarkerInfo

injectGlobal`
.gm-style-iw{
  color: green !important;
  -webkit-animation: fade-in-fwd 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: fade-in-fwd 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
 /**
 * ----------------------------------------
 * animation fade-in-fwd
 * ----------------------------------------
 */
@-webkit-keyframes fade-in-fwd {
  0% {
    -webkit-transform: translateZ(-80px);
            transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    opacity: 1;
  }
}
@keyframes fade-in-fwd {
  0% {
    -webkit-transform: translateZ(-80px);
            transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    opacity: 1;
  }
}
`
