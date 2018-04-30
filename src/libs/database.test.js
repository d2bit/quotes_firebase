import {addQuote} from './database'
import auth from './auth'
jest.mock('./auth')
import {db} from './firebase'
jest.mock('./firebase')

describe('addQuote', () => {
  it('requires authentication', () => {
    auth.currentUser.mockReturnValueOnce(null)

    addQuote('patata frita test')

    expect(db.calls).toEqual([])
  })

  it('creates the quote', () => {
    const uid = 123
    auth.currentUser.mockReturnValueOnce({uid})
    const quoteId = 2
    const quote = 'patata frita que te lo crees tu'
    const expectedQuote = {
      quote,
      uid,
    }
    db.addMock('quotes', {key: quoteId, quote, uid})

    addQuote(quote)

    expect(db.calls[0].reference).toEqual('quotes')
    expect(db.calls[0].calls).toEqual([{push: [expectedQuote]}])

    expect(db.calls[1].reference).toEqual('users')
    expect(db.calls[1].calls).toEqual([
      {child: [uid]},
      {child: ['quotes']},
      {child: [quoteId]},
      {set: [true]},
    ])
  })
})
