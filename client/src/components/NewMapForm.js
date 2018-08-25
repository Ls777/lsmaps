import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMap } from '../reducers/map.js'

const NewMapForm = ({ addMap }) => (
  <div>
    <button onClick={() => addMap({})}>
      new map
    </button>
  </div>
)

export default connect(null, { addMap })(NewMapForm)
