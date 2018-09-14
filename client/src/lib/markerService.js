import axios from 'axios'
const querystring = require('querystring')

export const getMarkers = async id => {
  try {
    const response = await axios.get(`/markers/bymap/${id}`)
    return response.data
  } catch (err) {
    console.log('====================================')
    console.log(err)
    console.log('====================================')
    return err
  }
}

export const createMarker = async marker => {
  try {
    const response = await axios.post(
      '/markers/',
      querystring.stringify(marker)
    )
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log('failed')
    console.log(err)
    console.log(err.response)
    return err
  }
}
