import { getMarkers, createMarker } from '../lib/markerService'

export const SET_MARKERS = 'SET_MARKERS'
export const ADD_MARKER = 'ADD_MARKER'

export const setMarkers = markers => ({ type: SET_MARKERS, payload: markers })
export const addMarker = marker => ({ type: ADD_MARKER, payload: marker })

export const fetchMarkers = id => {
  return async dispatch => {
    try {
      const markers = await getMarkers(id)
      console.log('marker dispatch' + markers)
      console.log(markers)
      dispatch(setMarkers(markers))
    } catch (err) {
      console.log('====================================')
      console.log(err)
      console.log('====================================')
      return err
    }
  }
}

export const newMarker = marker => {
  return async dispatch => {
    try {
      const response = await createMarker(marker)
      console.log(response)
      dispatch(addMarker({ id: response.markerId, ...marker }))
    } catch (err) {
      console.log('====================================')
      console.log(err)
      console.log('====================================')
      return err
    }
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case SET_MARKERS:
      return action.payload
    case ADD_MARKER:
      return [...state, action.payload]
    default:
      return state
  }
}