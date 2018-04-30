import * as ActionTypes from '../actions'

const initialState = {
  isFetching: false,
  error: null,
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_FIREBASE_EVENTS_SUBSCRIPTION:
      return {...state, isFetching: true}
    case ActionTypes.QUOTE_CREATE_RESPONSE:
      return {...state, isFetching: false}
    case ActionTypes.UI_ERROR_SET:
      return {...state, error: action.data}
    case ActionTypes.UI_ERROR_CLEAR:
      return {...state, error: null}
    default:
      return state
  }
}

export default reducer
