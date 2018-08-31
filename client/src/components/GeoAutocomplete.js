import React, { Component } from 'react'

class GeoAutocomplete extends Component {
  state = { input: '' }

  render () {
    return <input value={this.state.input} />
  }
}

export default GeoAutocomplete
