import { getMap, createMap, editMap } from '../lib/mapService'
import { newMarker } from './marker'

const initState = {
  loading: false,
  id: null,
  name: null,
  url: null,
  description: null,
  theme_id: null,
  error: null
}

export const MAP_SET = 'MAP_SET'
export const MAP_CLEAR = 'MAP_CLEAR'

export const setMap = map => ({ type: MAP_SET, payload: map })
export const clearMap = () => ({ type: MAP_CLEAR })

export const fetchMap = id => {
  return async dispatch => {
    try {
      dispatch(setMap({ loading: true }))
      const map = await getMap(id)
      dispatch(setMap({ loading: false, ...map }))
    } catch (err) {
      dispatch(setMap({ error: err }))
      console.log('====================================')
      console.log(err)
      console.log(err.response)
      console.log('====================================')
    }
  }
}

export const newMap = map => {
  return async dispatch => {
    try {
      dispatch(setMap({ loading: true }))
      const response = await createMap(map)
      dispatch(setMap({ loading: false, ...map, id: response.mapId }))
    } catch (err) {
      console.log('====================================')
      console.log(err)
      console.log(err.response)
      console.log('====================================')
    }
  }
}

export const updateMap = map => {
  return async (dispatch, getState) => {
    try {
      dispatch(setMap({ loading: true }))
      const response = await editMap(getState().map.id, map)
      dispatch(setMap({ loading: false, ...map }))
    } catch (err) {
      console.log('====================================')
      console.log(err)
      console.log(err.response)
      console.log('====================================')
    }
  }
}

export const cloneMap = () => {
  return async (dispatch, getState) => {
    const { map, markers } = getState()
    const { name, description, url } = map
    await dispatch(newMap({ name, description, url }))
    const newId = getState().map.id
    const promises = []
    markers.forEach(marker => {
      const { id, map_id, ...newMarkerObj } = marker
      newMarkerObj.mapId = newId
      console.log(newMarkerObj)
      promises.push(dispatch(newMarker(newMarkerObj)))
    })

    await Promise.all(promises)
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case MAP_SET:
      return { ...state, ...action.payload }
    case MAP_CLEAR:
      return initState
    default:
      return state
  }
}
