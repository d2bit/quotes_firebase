export const CREATE_FIREBASE_EVENTS_SUBSCRIPTION = '__create_firebase_events_subscription__'
export const REMOVE_FIREBASE_EVENTS_SUBSCRIPTION = '__remove_firebase_events_subscription__'

export const AUTH_LOGIN_REQUEST = '__auth_login_request__'
export const AUTH_LOGOUT_REQUEST = '__auth_logout_request__'
export const AUTH_RESPONSE = '__auth_response__'

export const QUOTE_CREATE_REQUEST = '__quote_create_request__'
export const QUOTE_REMOVE_REQUEST = '__quote_delete_request__'
export const QUOTE_TOGGLE_LIKE_REQUEST = '__quote_toggle_like_request__'
export const QUOTE_CREATE_RESPONSE = '__quote_create_response__'
export const QUOTE_UPDATE_RESPONSE = '__quote_update_response__'
export const QUOTE_REMOVE_RESPONSE = '__quote_remove_response__'

export const UI_ERROR_SET = '__ui_error_set__'
export const UI_ERROR_CLEAR = '__ui_error_clear__'

export const AUTH_REQUIRED = '__auth_required__'

export function authLoginRequest() {
  return {
    type: AUTH_LOGIN_REQUEST,
  }
}
export function authLogoutRequest() {
  return {
    type: AUTH_LOGOUT_REQUEST,
  }
}
export function authResponse(data) {
  return {
    type: AUTH_RESPONSE,
    data,
  }
}

export function setUIError(data) {
  return {
    type: UI_ERROR_SET,
    data,
  }
}
export function clearUIError() {
  return {
    type: UI_ERROR_CLEAR,
  }
}

export function subscribeToFirebaseEvents() {
  return {
    type: CREATE_FIREBASE_EVENTS_SUBSCRIPTION,
  }
}
export function unsubscribeFromFirebaseEvents() {
  return {
    type: REMOVE_FIREBASE_EVENTS_SUBSCRIPTION,
  }
}

export function addQuote(quote) {
  return {
    type: QUOTE_CREATE_REQUEST,
    auth: 'user',
    data: quote,
  }
}
export function removeQuote(quoteId) {
  return {
    type: QUOTE_REMOVE_REQUEST,
    auth: 'owner',
    getUid: state => state.quotes.find(quote => quote.id === quoteId).uid,
    data: quoteId,
  }
}

export function addCreatedQuote(newQuote) {
  return {
    type: QUOTE_CREATE_RESPONSE,
    data: newQuote,
  }
}
export function updateModifiedQuote(quoteId) {
  return {
    type: QUOTE_UPDATE_RESPONSE,
    data: quoteId,
  }
}
export function removeDeletedQuote(quoteId) {
  return {
    type: QUOTE_REMOVE_RESPONSE,
    data: quoteId,
  }
}

export function toggleLike(quoteId) {
  return {
    type: QUOTE_TOGGLE_LIKE_REQUEST,
    auth: 'user',
    data: quoteId,
  }
}
