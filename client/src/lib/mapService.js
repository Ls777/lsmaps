import axios from 'axios'
const querystring = require('querystring')

const map = { name: 'default', description: 'yes' }

const markers = [
  { lat: 1, lng: 2, name: 'hi' },
  { lat: 2, lng: 2, name: 'hi' },
  { lat: 3, lng: 2, name: 'hi' }
]

export const getMap = async id => {
  console.log('getting map')
  try {
    const response = await axios.get('/maps/1')
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log('====================================')
    console.log(err)
    console.log('====================================')
    return err
  }
}

export const createMap = async map => {
  try {
    console.log('creating map')
    console.log(map)
    const response = await axios.post('/maps/', querystring.stringify(map))
    console.log(response.data)
    return true
  } catch (err) {
    console.log('failed')
    console.log(err)
    console.log(err.response)
    return err
  }
}
