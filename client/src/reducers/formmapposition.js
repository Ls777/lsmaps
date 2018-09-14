const initState = {
  formMapPosition: { lat: '', lng: '' }
}

const SET_FORM_MAP_POSITION = 'SET_FORM_MAP_POSITION'

export const setFormMapPosition = position => ({
  type: SET_FORM_MAP_POSITION,
  payload: position
})

export default (state = initState, action) => {
  switch (action.type) {
    case SET_FORM_MAP_POSITION:
      return { ...state, formMapPosition: action.payload }
    default:
      return state
  }
}
