const initState = {
  showNewMapForm: false,
  showNewMarkerForm: false,
  selectLocationMode: false,
  infoWindowMarker: null,
  infoWindowMarkerId: null,
  formMapPosition: { lat: '', lng: '' }
}

const OPEN_NEW_MAP_FORM = 'OPEN_NEW_MAP_FORM'
const CLOSE_NEW_MAP_FORM = 'CLOSE_NEW_MAP_FORM'
const OPEN_NEW_MARKER_FORM = 'OPEN_NEW_MARKER_FORM'
const CLOSE_NEW_MARKER_FORM = 'CLOSE_NEW_MARKER_FORM'
const ENTER_SELECT_LOCATION_MODE = 'ENTER_SELECT_LOCATION_MODE'
const EXIT_SELECT_LOCATION_MODE = 'EXIT_SELECT_LOCATION_MODE'
const OPEN_INFO_WINDOW = 'OPEN_INFO_WINDOW'
const CLOSE_INFO_WINDOW = 'CLOSE_INFO_WINDOW'
const SET_FORM_MAP_POSITION = 'SET_FORM_MAP_POSITION'

export const openNewMapForm = () => ({ type: OPEN_NEW_MAP_FORM })
export const closeNewMapForm = () => ({ type: CLOSE_NEW_MAP_FORM })
export const openNewMarkerForm = () => ({ type: OPEN_NEW_MARKER_FORM })
export const closeNewMarkerForm = () => ({ type: CLOSE_NEW_MARKER_FORM })
export const openInfoWindow = (marker, id) => ({
  type: OPEN_INFO_WINDOW,
  payload: { marker, id }
})
export const closeInfoWindow = () => ({ type: CLOSE_INFO_WINDOW })
export const enterSelectLocationMode = () => ({
  type: ENTER_SELECT_LOCATION_MODE
})
export const exitSelectLocationMode = () => ({
  type: EXIT_SELECT_LOCATION_MODE
})

export const setFormMapPosition = position => ({
  type: SET_FORM_MAP_POSITION,
  payload: position
})

export default (state = initState, action) => {
  switch (action.type) {
    case OPEN_NEW_MAP_FORM:
      return { ...state, showNewMapForm: true }
    case CLOSE_NEW_MAP_FORM:
      return { ...state, showNewMapForm: false }
    case OPEN_NEW_MARKER_FORM:
      return { ...state, showNewMarkerForm: true }
    case CLOSE_NEW_MARKER_FORM:
      return { ...state, showNewMarkerForm: false }
    case OPEN_INFO_WINDOW:
      return {
        ...state,
        infoWindowMarker: action.payload.marker,
        infoWindowMarkerId: action.payload.id
      }
    case CLOSE_INFO_WINDOW:
      return { ...state, infoWindowMarker: null }
    case ENTER_SELECT_LOCATION_MODE:
      return { ...state, selectLocationMode: true }
    case EXIT_SELECT_LOCATION_MODE:
      return { ...state, selectLocationMode: false }
    case SET_FORM_MAP_POSITION:
      return { ...state, formMapPosition: action.payload }
    default:
      return state
  }
}
