const initState = {
  showMapForm: false,
  showMarkerForm: false,
  formEdit: false,
  markerFormEditMarkerId: null,
  selectLocationMode: false,
  infoWindowMarker: null,
  infoWindowMarkerId: null
}

const OPEN_MAP_FORM = 'OPEN_MAP_FORM'
const CLOSE_MAP_FORM = 'CLOSE_MAP_FORM'
const OPEN_MARKER_FORM = 'OPEN_MARKER_FORM'
const CLOSE_MARKER_FORM = 'CLOSE_MARKER_FORM'
const ENTER_SELECT_LOCATION_MODE = 'ENTER_SELECT_LOCATION_MODE'
const EXIT_SELECT_LOCATION_MODE = 'EXIT_SELECT_LOCATION_MODE'
const OPEN_INFO_WINDOW = 'OPEN_INFO_WINDOW'
const CLOSE_INFO_WINDOW = 'CLOSE_INFO_WINDOW'
const UI_CLEAR = 'UI_CLEAR'

export const clearUi = () => ({ type: UI_CLEAR })

export const openMapForm = (edit = false) => ({
  type: OPEN_MAP_FORM,
  payload: edit
})
export const closeMapForm = () => ({ type: CLOSE_MAP_FORM })
export const openMarkerForm = (edit = false, markerId = null) => ({
  type: OPEN_MARKER_FORM,
  payload: { edit, markerId }
})
export const closeMarkerForm = () => ({ type: CLOSE_MARKER_FORM })
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

export default (state = initState, action) => {
  switch (action.type) {
    case OPEN_MAP_FORM:
      return { ...state, showNewMapForm: true, formEdit: action.payload }
    case CLOSE_MAP_FORM:
      return { ...state, showNewMapForm: false, formEdit: false }
    case OPEN_MARKER_FORM:
      return {
        ...state,
        showNewMarkerForm: true,
        formEdit: action.payload.edit,
        markerFormEditMarkerId: action.payload.markerId
      }
    case CLOSE_MARKER_FORM:
      return {
        ...state,
        showNewMarkerForm: false,
        formEdit: false,
        markerFormEditMarkerId: null
      }
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
    case UI_CLEAR:
      return initState
    default:
      return state
  }
}
