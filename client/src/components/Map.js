import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMap } from '../reducers/map'
import { fetchMarkers } from '../reducers/marker'
import NewMarkerForm from './NewMarkerForm'

class Map extends Component {
  componentDidMount () {
    this.props.fetchMap(this.props.fetchId)
    this.props.fetchMarkers(this.props.fetchId)
  }
  render () {
    if (this.props.map.error === 'map not found') {
      return <h1>map doesnt exist</h1>
    }
    return (
      <div>
        <MapDetails map={this.props.map} />
        <MarkerRender markers={this.props.markers} />
        <NewMarkerForm />
      </div>
    )
  }
}

const MapDetails = ({ map }) => <h2>can u see me {map.name}</h2>

const MarkerRender = ({ markers }) => (
  <div>
    <h3>markers {markers.length}</h3>
    <ul>
      {markers.length > 0 &&
        markers.map(marker => <li key={marker.id}>name : {marker.name}</li>)}

    </ul>
  </div>
)

export default connect(state => ({ map: state.map, markers: state.markers }), {
  fetchMap,
  fetchMarkers
})(Map)
