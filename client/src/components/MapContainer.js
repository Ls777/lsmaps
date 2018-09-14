import React, { Component, Fragment } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import { Link } from 'react-router-dom'
import { MyMap } from './MyMap'
import { connect } from 'react-redux'
import { fetchMap } from '../reducers/map'
import { fetchMarkers } from '../reducers/marker'
import {
  closeNewMarkerForm,
  openInfoWindow,
  closeInfoWindow,
  exitSelectLocationMode
} from '../reducers/ui'
import { setFormMapPosition } from '../reducers/formmapposition'
import mapStyles from '../lib/mapStyles'
import MapUi from './MapUi'
import NewMarkerForm from './NewMarkerForm'
import MapHeader from './MapHeader'
import MarkerInfo from './MarkerInfo'
import MapContextMenu from './MapContextMenu'
import { css, cx } from 'emotion'

import {
  ButtonGroup,
  Button,
  Dialog,
  NonIdealState,
  Spinner,
  Card,
  H2,
  H5,
  ContextMenu,
  Menu,
  MenuItem,
  MenuDivider,
  Icon,
  Overlay
} from '@blueprintjs/core'

class MapContainer extends Component {
  state = {
    position: null,
    contextMenuPosition: null
  }

  componentDidMount () {
    this.props.fetchMap(this.props.fetchId)
    this.props.fetchMarkers(this.props.fetchId)
  }

  componentDidUpdate (prevProps) {
    const { selectLocationMode } = this.props.ui
    if (prevProps.ui.selectLocationMode !== selectLocationMode) {
      this.state.map.setOptions({
        draggableCursor: selectLocationMode ? 'crosshair' : 'grab',
        draggingCursor: 'grab'
      })
    }

    if (prevProps.form !== this.props.form) {
      console.log(this.props.form.formMapPosition)
      this.state.map.setCenter({
        lat: parseFloat(this.props.form.formMapPosition.lat),
        lng: parseFloat(this.props.form.formMapPosition.lng)
      })
      this.state.map.setZoom(13)
    }
  }

  onMapClick = (mapProps, map, clickEvent) => {
    if (this.props.ui.selectLocationMode) {
      this.props.setFormMapPosition({
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng()
      })
      this.props.exitSelectLocationMode()
    } else {
      console.log(clickEvent)
    }
  }

  onMapReady = (mapProps, map) => {
    const { google } = mapProps
    this.setState({ map: map })
    google.maps.event.addListener(map, 'rightclick', event => {
      setTimeout(
        function () {
          if (!this.props.ui.selectLocationMode) {
            this.setState({
              contextMenuPosition: { x: event.va.clientX, y: event.va.clientY }
            })
          }
        }.bind(this),
        0
      )
    })
  }

  render () {
    const { mapInfo, markers, google } = this.props

    const markerRender =
      markers.length > 0 &&
      markers.map(marker => (
        <Marker
          key={marker.id}
          id={marker.id}
          title={marker.name}
          position={{ lat: marker.lat, lng: marker.lng }}
          name={marker.name}
          onClick={(props, markerInstance) =>
            this.props.openInfoWindow(markerInstance, marker.id)}
        />
      ))

    return (
      <div className={containerStyle}>
        <MapHeader map={mapInfo} className={noflex} />
        <Dialog isOpen={this.props.mapInfo.error}>
          <NonIdealState
            intent='danger'
            title='Map not found'
            icon='error'
            action={
              <Link to='/'>
                <Button icon='home' text='Home' intent='primary' />
              </Link>
            }
            description="I'm sorry, we weren't able to find that map."
          />
        </Dialog>

        <MyMap
          className='map'
          center={this.state.position}
          onReady={this.onMapReady}
          google={google}
          zoom={14}
          gestureHandling='greedy'
          styles={mapStyles}
          mapTypeControlOptions={{
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_RIGHT
          }}
          streetViewControl={false}
          onClick={this.onMapClick}
          containerStyle={{
            width: '100%',
            height: 'auto',
            flex: 'auto',
            position: 'relative'
          }}
        >

          {markerRender}
          <MarkerInfo {...this.props} />
          <MapUi />
          <MapContextMenu
            isOpen={
              this.state.contextMenuPosition !== null &&
                !this.props.ui.selectLocationMode
            }
            {...this.state.contextMenuPosition}
            onClose={() => this.setState({ contextMenuPosition: null })}
          />
          <NewMarkerForm />
        </MyMap>
      </div>
    )
  }
}

const MarkerRenderOld = ({ markers }) => (
  <div>
    <h3>markers {markers.length}</h3>
    <ul>
      {markers.length > 0 &&
        markers.map(marker => <li key={marker.id}>name : {marker.name}</li>)}

    </ul>
  </div>
)

const Loading = () => <div><Spinner /></div>

const noflex = css`
  flex: none;
`

const containerStyle = css`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Connected = connect(
  state => ({
    mapInfo: state.map,
    markers: state.markers,
    ui: state.ui,
    form: state.formMapPosition
  }),
  {
    fetchMap,
    fetchMarkers,
    closeNewMarkerForm,
    openInfoWindow,
    closeInfoWindow,
    setFormMapPosition,
    exitSelectLocationMode
  }
)(MapContainer)

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCp078_EVlv__D9Y0qjEUrQOrFhO8r3HW8',
  libraries: ['places'],
  LoadingContainer: Loading
})(Connected)
