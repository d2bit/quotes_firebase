import * as ActionTypes from '../actions'

const initialState = []
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.QUOTE_CREATE_RESPONSE:
      return [action.data, ...state]
    case ActionTypes.QUOTE_UPDATE_RESPONSE:
      const newState = [...state]
      const updatedIndex = newState.findIndex(quote => quote.id === action.data.id)
      newState[updatedIndex] = action.data
      return newState
    case ActionTypes.QUOTE_REMOVE_RESPONSE:
      return state.filter(quote => quote.id !== action.data.id)
    default:
      return state
  }
}

export default reducer
