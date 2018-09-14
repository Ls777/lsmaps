import React from 'react'
import ReactDOM from 'react-dom'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

const evtNames = [
  'ready',
  'click',
  'dragend',
  'recenter',
  'bounds_changed',
  'center_changed',
  'dblclick',
  'dragstart',
  'heading_change',
  'idle',
  'maptypeid_changed',
  'mousemove',
  'mouseout',
  'mouseover',
  'projection_changed',
  'resize',
  'rightclick',
  'tilesloaded',
  'tilt_changed',
  'zoom_changed'
]

export class MyMap extends Map {
  loadMap () {
    if (this.props && this.props.google) {
      const { google } = this.props
      const maps = google.maps

      const mapRef = this.refs.map
      const node = ReactDOM.findDOMNode(mapRef)
      const curr = this.state.currentLocation
      const center = new maps.LatLng(curr.lat, curr.lng)

      const mapTypeIds = this.props.google.maps.MapTypeId || {}
      const mapTypeFromProps = String(this.props.mapType).toUpperCase()

      const mapConfig = Object.assign(
        {},
        {
          mapTypeId: mapTypeIds[mapTypeFromProps],
          center: center,
          zoom: this.props.zoom,
          maxZoom: this.props.maxZoom,
          minZoom: this.props.minZoom,
          clickableIcons: !!this.props.clickableIcons,
          disableDefaultUI: this.props.disableDefaultUI,
          zoomControl: this.props.zoomControl,
          mapTypeControl: this.props.mapTypeControl,
          mapTypeControlOptions: this.props.mapTypeControlOptions,
          scaleControl: this.props.scaleControl,
          streetViewControl: this.props.streetViewControl,
          panControl: this.props.panControl,
          rotateControl: this.props.rotateControl,
          fullscreenControl: this.props.fullscreenControl,
          scrollwheel: this.props.scrollwheel,
          draggable: this.props.draggable,
          draggableCursor: this.props.draggableCursor,
          keyboardShortcuts: this.props.keyboardShortcuts,
          disableDoubleClickZoom: this.props.disableDoubleClickZoom,
          noClear: this.props.noClear,
          styles: this.props.styles,
          gestureHandling: this.props.gestureHandling
        }
      )

      Object.keys(mapConfig).forEach(key => {
        // Allow to configure mapConfig with 'false'
        if (mapConfig[key] === null) {
          delete mapConfig[key]
        }
      })

      this.map = new maps.Map(node, mapConfig)

      evtNames.forEach(e => {
        this.listeners[e] = this.map.addListener(e, this.handleEvent(e))
      })
      maps.event.trigger(this.map, 'ready')
      this.forceUpdate()
    }
  }
}

export default MyMap
