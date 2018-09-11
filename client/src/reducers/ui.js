const initState = {
  showNewMapForm: false,
  showNewMarkerForm: false,
  selectLocationMode: false
}

const OPEN_NEW_MAP_FORM = 'OPEN_NEW_MAP_FORM'
const CLOSE_NEW_MAP_FORM = 'CLOSE_NEW_MAP_FORM'
const OPEN_NEW_MARKER_FORM = 'OPEN_NEW_MARKER_FORM'
const CLOSE_NEW_MARKER_FORM = 'CLOSE_NEW_MARKER_FORM'
const ENTER_SELECT_LOCATION_MODE = 'ENTER_SELECT_LOCATION_MODE'

export const openNewMapForm = () => ({ type: OPEN_NEW_MAP_FORM })
export const closeNewMapForm = () => ({ type: CLOSE_NEW_MAP_FORM })
export const openNewMarkerForm = () => ({ type: OPEN_NEW_MARKER_FORM })
export const closeNewMarkerForm = () => ({ type: CLOSE_NEW_MARKER_FORM })

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
    default:
      return state
  }
}
