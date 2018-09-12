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
  closeInfoWindow
} from '../reducers/ui'
import mapStyles from '../lib/mapStyles'
import MapUi from './MapUi'
import NewMarkerForm from './NewMarkerForm'
import MapHeader from './MapHeader'
import MarkerInfo from './MarkerInfo'
import { css, cx } from 'emotion'

import {
  ButtonGroup,
  Button,
  Dialog,
  NonIdealState,
  Spinner,
  Card,
  H2,
  H3
} from '@blueprintjs/core'

import { enableEnterKey } from '../lib/helper'

class MapContainer extends Component {
  state = {
    position: null
  }

  componentDidMount() {
    this.props.fetchMap(this.props.fetchId)
    this.props.fetchMarkers(this.props.fetchId)
  }

  renderAutoComplete = (mapProps, map) => {
    const { google } = mapProps

    if (!google || !map) {
      console.log('no google or map')
      console.log(google)
      console.log(map)
      return
    }

    console.log(google)
    console.log(map)
    console.log('yes google yes map')

    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete)
    enableEnterKey(this.autocomplete)

    // autocomplete.bindTo(map, 'bounds')

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()

      if (!place.geometry) return
      else {
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport)
        }
        map.setCenter(place.geometry.location)
        map.setZoom(13)
      }

      this.setState({ position: place.geometry.location })
    })
  }

  render() {
    const { mapInfo, markers, google } = this.props
    const { infoWindowMarker, infoWindowMarkerId } = this.props.ui

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
        <Dialog
          isOpen={this.props.ui.showNewMarkerForm}
          title='New Marker'
          onClose={this.props.closeNewMarkerForm}
        >
          <NewMarkerForm />
        </Dialog>
        <MyMap
          className='map'
          onReady={this.renderAutoComplete}
          center={this.state.position}
          google={google}
          zoom={14}
          gestureHandling='greedy'
          styles={mapStyles}
          mapTypeControlOptions={{
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_RIGHT
          }}
          streetViewControl={false}
          onClick={this.onMapClicked}
          containerStyle={{
            width: '100%',
            height: 'auto',
            flex: 'auto',
            position: 'relative'
          }}
        >
          {markerRender}
          <MarkerInfo {...this.props} />
          <MapUi inputRef={ref => (this.autocomplete = ref)} />
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
  state => ({ mapInfo: state.map, markers: state.markers, ui: state.ui }),
  {
    fetchMap,
    fetchMarkers,
    closeNewMarkerForm,
    openInfoWindow,
    closeInfoWindow
  }
)(MapContainer)

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCp078_EVlv__D9Y0qjEUrQOrFhO8r3HW8',
  libraries: ['places'],
  LoadingContainer: Loading
})(Connected)
