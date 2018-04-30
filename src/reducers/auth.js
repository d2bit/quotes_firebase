import * as ActionTypes from '../actions'

const initialState = {
  uid: null,
  user: null,
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_LOGIN_REQUEST:
    case ActionTypes.AUTH_LOGOUT_REQUEST:
      return state
    case ActionTypes.AUTH_RESPONSE:
      if (!action.data) return initialState
      return {uid: action.data.uid, user: action.data}
    default:
      return state
  }
}

export default reducer
