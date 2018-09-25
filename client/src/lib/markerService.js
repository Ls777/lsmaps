import axios from 'axios'
const querystring = require('querystring')

export const getMarkers = async id => {
  const response = await axios.get(`/markers/bymap/${id}`)
  return response.data
}

export const createMarker = async marker => {
  const response = await axios.post('/markers/', querystring.stringify(marker))
  console.log(response.data)
  return response.data
}
