import React, { Component } from 'react'
import { Marker, GoogleApiWrapper } from 'google-maps-react'
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
import { setMapPosition } from '../reducers/mapposition'
import mapStyles from '../lib/mapStyles'
import MapUi from './MapUi'
import NewMarkerForm from './NewMarkerForm'
import MapHeader from './MapHeader'
import MarkerInfo from './MarkerInfo'
import MapContextMenu from './MapContextMenu'
import MapNotFound from './MapNotFound'
import { css, cx } from 'emotion'

import { Button, Dialog, NonIdealState, Spinner } from '@blueprintjs/core'

class MapContainer extends Component {
  state = {
    contextMenuPosition: null,
    map: null
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

    if (prevProps.mapPosition !== this.props.mapPosition) {
      console.log(this.props.mapPosition)
      this.state.map.setCenter({
        lat: parseFloat(this.props.mapPosition.lat),
        lng: parseFloat(this.props.mapPosition.lng)
      })
      this.state.map.setZoom(13)
    }
  }

  onMapClick = (mapProps, map, clickEvent) => {
    if (this.props.ui.selectLocationMode) {
      this.props.setMapPosition({
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
            console.log(event)
            this.setState({
              contextMenuPosition: {
                x: event.va.clientX,
                y: event.va.clientY,
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
              }
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
      <div className={cx(containerStyle, 'bp3-light')}>
        <MapHeader map={mapInfo} className={noflex} />
        <MapNotFound isOpen={this.props.mapInfo.error} />

        <MyMap
          className='map'
          initialCenter={{ lat: 27, lng: -10 }}
          onReady={this.onMapReady}
          google={google}
          zoom={3}
          minZoom={3}
          maxZoom={16}
          gestureHandling='greedy'
          styles={mapStyles[0]}
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

const Loading = () => (
  <div className={css`margin-top: 25%;`}><Spinner size={200} /></div>
)

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
    mapPosition: state.mapPosition
  }),
  {
    fetchMap,
    fetchMarkers,
    closeNewMarkerForm,
    openInfoWindow,
    closeInfoWindow,
    setMapPosition,
    exitSelectLocationMode
  }
)(MapContainer)

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCp078_EVlv__D9Y0qjEUrQOrFhO8r3HW8',
  libraries: ['places'],
  LoadingContainer: Loading
})(Connected)
