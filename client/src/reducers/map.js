import { getMap, createMap } from '../lib/mapService'

const initState = {
  loading: false,
  id: null,
  name: null,
  url: null,
  description: null,
  theme_id: null
}

export const MAP_SET = 'MAP_SET'
export const MAP_CLEAR = 'MAP_SET'

export const setMap = map => ({ type: MAP_SET, payload: map })
export const clearMap = () => ({ type: MAP_CLEAR })

export const fetchMap = id => {
  return async dispatch => {
    try {
      dispatch(setMap({ loading: true }))
      const map = await getMap(id)
      dispatch(setMap({ loading: false, ...map }))
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
      dispatch(setMap({ loading: true }))
      const response = await createMap(map)
      dispatch(setMap({ loading: false, id: response.mapId }))
      console.log(response)
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
    case MAP_CLEAR:
      return initState
    default:
      return state
  }
}
