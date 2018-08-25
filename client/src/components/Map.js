import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMap, addMap } from '../reducers/map'

class Map extends Component {
  componentDidMount () {
    this.props.fetchMap()
  }
  render () {
    return (
      <div>
        <h2>can u see me {this.props.map.name}</h2>

      </div>
    )
  }
}

export default connect(state => ({ map: state.map }), { fetchMap })(Map)
