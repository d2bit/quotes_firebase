import db, {
  addQuote,
  disconnect,
  removeQuote,
  toggleLike,
} from '../libs/database'
import {
  addCreatedQuote,
  updateModifiedQuote,
  removeDeletedQuote,
} from '../actions'
import * as ActionTypes from '../actions'

function database({getState, dispatch}) {
  return (next) => (action) => {
    switch (action.type) {
      case ActionTypes.CREATE_FIREBASE_EVENTS_SUBSCRIPTION:
        dispatch(subscribeToQuoteEvents())
        break
      case ActionTypes.REMOVE_FIREBASE_EVENTS_SUBSCRIPTION:
        disconnect()
        break
      case ActionTypes.QUOTE_CREATE_REQUEST:
        addQuote(action.data)
        break
      case ActionTypes.QUOTE_REMOVE_REQUEST:
        removeQuote(action.data)
        break
      case ActionTypes.QUOTE_TOGGLE_LIKE_REQUEST:
        toggleLike(action.data)
        break
      default:
    }
    return next(action)
  }
}

function subscribeToQuoteEvents() {
  return (dispatch) => {
    const Quote = db.quotesModel
    Quote.subscribeChildEvent('child_added', (newQuote) =>
      dispatch(addCreatedQuote(newQuote)),
    )

    Quote.subscribeChildEvent('child_changed', (updatedQuote) =>
      dispatch(updateModifiedQuote(updatedQuote)),
    )

    Quote.subscribeChildEvent('child_removed', (removedQuote) =>
      dispatch(removeDeletedQuote(removedQuote)),
    )
  }
}

export default database
