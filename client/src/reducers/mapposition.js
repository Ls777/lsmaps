const initState = {
  lat: '',
  lng: ''
}

const SET_MAP_POSITION = 'SET_MAP_POSITION'

export const setMapPosition = position => ({
  type: SET_MAP_POSITION,
  payload: position
})

export default (state = initState, action) => {
  switch (action.type) {
    case SET_MAP_POSITION:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
