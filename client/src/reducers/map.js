import { getMap, createMap } from '../lib/mapService'

const initState = { loading: false }

export const MAP_SET = 'MAP_SET'

export const setMap = map => ({ type: MAP_SET, payload: map })

export const fetchMap = id => {
  return async dispatch => {
    try {
      // dispatch(fetchingMap())
      const map = await getMap(id)
      dispatch(setMap(map))
    } catch (err) {
      console.log('====================================')
      console.log(err)
      console.log('====================================')
    }
  }
}

export const newMap = map => {
  return async dispatch => {
    try {
      const response = await createMap(map)
      dispatch(setMap({ id: response.mapId, ...map }))
    } catch (err) {
      console.log('====================================')
      console.log(err)
      console.log('====================================')
    }
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case MAP_SET:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
