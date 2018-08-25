import { getMap, createMap } from '../lib/mapService'

const MAP_SET = 'MAP_SET'

export const setMap = map => ({ type: MAP_SET, payload: map })

export const fetchMap = id => {
  return async dispatch => {
    try {
      // todo dispatch loading state
      const map = await getMap(id)
      console.log(map)
      dispatch(setMap(map))
    } catch (err) {
      console.log('====================================')
      console.log(err)
      console.log('====================================')
    }
  }
}

export const addMap = map => {
  return async dispatch => {
    try {
      const success = await createMap(map)
      dispatch(setMap(map))
    } catch (err) {
      console.log('====================================')
      console.log(err)
      console.log('====================================')
    }
  }
}

/* export const addMap = map => {
  return dispatch => {
    console.log('thunked')
    createMap(map)
      .then(map => dispatch(setMap(map)))
      .catch(e => console.log('erro' + e))
  }
} */

export default (state = {}, action) => {
  switch (action.type) {
    case MAP_SET:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
