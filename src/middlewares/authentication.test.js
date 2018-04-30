import authorization from './authorization'

const initialState = {
  auth: {
    uid: null,
    user: null,
  },
}

it('breaks flow when no authorized', () => {
  const context = {
    getState: () => ({
      ...initialState,
    }),
    dispatch: jest.fn(),
  }
  const next = jest.fn()
  const action = {type: '__an_action__', auth: 'user'}

  authorization(context)(next)(action)

  expect(next).not.toHaveBeenCalled()
  expect(context.dispatch).toHaveBeenCalledTimes(1)
  expect(context.dispatch).toHaveBeenCalledWith({
    type: '__ui_error_set__',
    data: 'Must be authenticated as user',
  })
})

it('flows when no authorization is required', () => {
  const context = {
    getState: () => ({
      ...initialState,
    }),
  }
  const next = jest.fn()
  const action = {type: '__an_action__'}

  authorization(context)(next)(action)

  expect(next).toHaveBeenCalledTimes(1)
  expect(next).toHaveBeenCalledWith(action)
})

it('flows when the authorization is granted', () => {
  const uid = 13
  const quoteId = 'quote-id'
  const context = {
    getState: () => ({
      ...initialState,
      auth: {
        uid,
        user: {},
      },
      quotes: {
        [quoteId]: {
          uid,
        },
      },
    }),
  }
  const next = jest.fn()
  const action = {
    type: '__an_action__',
    data: quoteId,
    auth: 'owner',
    getUid: (state) => state.quotes[quoteId].uid,
  }

  authorization(context)(next)(action)

  expect(next).toHaveBeenCalledTimes(1)
  expect(next).toHaveBeenCalledWith(action)
})
