import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import Map from './components/Map'
import NewMapForm from './components/NewMapForm'

class App extends Component {
  state = {
    data: null
  }

  /* componentDidMount () {
    console.log('wtff1')
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err))
  } */

  callBackendAPI = async () => {
    console.log('wtf')
    try {
      const response = "await axios('/express_backend')"
      console.log(response)
      return response.data
    } catch (e) {
      console.error(e)

      /* if (response.status !== 200) {
        throw Error(body.message)
      } */
    }
  }

  render () {
    return <div><Map /><NewMapForm /></div>
  }
}

export default App
