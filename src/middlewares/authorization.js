import {setUIError} from '../actions'

function authorization({getState, dispatch}) {
  return (next) => (action) => {
    if (action.auth) {
      if (!isValidAuth(getState(), action)) {
        dispatch(setUIError(`Must be authenticated as ${action.auth}`))
        return
      }
    }
    return next(action)
  }
}
function isValidAuth(state, action) {
  const uid = state.auth.uid
  switch (action.auth) {
    case 'user':
      return !!uid
    case 'owner':
      return uid === action.getUid(state)
    case 'admin':
      return false
    default:
  }
}

export default authorization
