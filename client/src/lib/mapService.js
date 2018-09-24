import axios from 'axios'
const querystring = require('querystring')

export const getMap = async id => {
  const response = await axios.get(`/maps/${id}`)
  return response.data
}

export const createMap = async map => {
  const response = await axios.post('/maps/', querystring.stringify(map))
  return response.data
}

export const editMap = async (id, map) => {
  console.log(map)
  const response = await axios.put(`/maps/${id}`, querystring.stringify(map))
  return response.data
}
