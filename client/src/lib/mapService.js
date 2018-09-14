import axios from 'axios'
const querystring = require('querystring')

export const getMap = async id => {
  try {
    const response = await axios.get(`/maps/${id}`)
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
    const response = await axios.post('/maps/', querystring.stringify(map))
    return response.data
  } catch (err) {
    console.log('failed')
    console.log(err)
    console.log(err.response)
    return err
  }
}
