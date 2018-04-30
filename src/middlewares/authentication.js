import auth from '../libs/auth'
import {authResponse} from '../actions'
import * as ActionTypes from '../actions'

function authentication({getState, dispatch}) {
  return (next) => (action) => {
    switch (action.type) {
      case ActionTypes.CREATE_FIREBASE_EVENTS_SUBSCRIPTION:
        dispatch(subscribeToAuthEvents())
        break
      case ActionTypes.AUTH_LOGIN_REQUEST:
        auth.signInWithGoggle()
        break
      case ActionTypes.AUTH_LOGOUT_REQUEST:
        auth.signOut()
        break
      default:
    }
    return next(action)
  }
}
function subscribeToAuthEvents() {
  return (dispatch) => {
    auth.subscribeEvent((currentUser) => dispatch(authResponse(currentUser)))
  }
}

export default authentication
