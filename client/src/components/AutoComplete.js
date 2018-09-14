import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setFormMapPosition } from '../reducers/formmapposition'
import { InputGroup } from '@blueprintjs/core'

class AutoComplete extends Component {
  componentDidMount () {
    this.renderAutoComplete()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.map !== this.props.map) {
      this.renderAutoComplete() // render on map ready
    }
  }

  renderAutoComplete = () => {
    const { google, map } = this.props
    if (!google || !map) {
      console.log('no google or map')
      console.log(google)
      console.log(map)
      return
    }

    console.log('yes google yes map')

    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete)
    enableEnterKey(this.autocomplete)

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()

      if (!place.geometry) return
      /* else {
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport)
        }
        map.setCenter(place.geometry.location)
        map.setZoom(13)
      } */
      this.props.setFormMapPosition({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      })
    })
  }

  render () {
    return (
      <InputGroup
        className={this.props.className}
        type='search'
        leftIcon='geolocation'
        inputRef={ref => (this.autocomplete = ref)}
      />
    )
  }
}

function enableEnterKey (input) {
  /* Store original event listener */
  const _addEventListener = input.addEventListener
    ? input.addEventListener
    : input.attachEvent

  const addEventListenerWrapper = (type, listener) => {
    if (type === 'keydown') {
      /* Store existing listener function */
      const _listener = listener
      listener = event => {
        /* Simulate a 'down arrow' keypress if no address has been selected */
        const suggestion_selected =
          document.getElementsByClassName('pac-item-selected').length > 0
        if (event.which === 13 && !suggestion_selected) {
          const e = JSON.parse(JSON.stringify(event))
          e.which = 40
          e.keyCode = 40
          _listener.apply(input, [e])
          // event.preventDefault()
        }
        _listener.apply(input, [event])
      }
    }
    _addEventListener.apply(input, [type, listener])
  }

  input.addEventListener = addEventListenerWrapper
  input.attachEvent = addEventListenerWrapper
}

export default connect(null, { setFormMapPosition })(AutoComplete)
