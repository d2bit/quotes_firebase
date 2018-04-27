import {db} from './firebase'
import auth from './auth'

function quotesRef() {
  return db.ref('quotes')
}
function usersRef() {
  return db.ref('users')
}

export function disconnect() {
  db.off()
}

function quotesModel() {
  const ref = quotesRef()
  return {
    subscribeChildEvent: subscribeChildEvent(ref)
  }
}
function subscribeChildEvent(ref) {
  return function subscribeChildEvent(eventName, callback) {
    ref.on(eventName, (childSnapshot) => {
      const child = {...childSnapshot.val(), id: childSnapshot.key}
      return callback(child)
    })
  }
}

export function addQuote(quote) {
  const currentUser = auth.currentUser()
  if (!currentUser) return console.error('Should be authenticated')

  const newQuote = quotesRef().push({quote})

  usersRef()
    .child(currentUser.uid)
    .child('quotes')
    .child(newQuote.key)
    .set(true)

}

export function removeQuote(id) {
  const currentUser = auth.currentUser()
  if (!currentUser) return console.error('Should be authenticated')

  const quoteToRemove = quotesRef().child(id)

  usersRef()
    .child(currentUser.uid)
    .child('quotes')
    .child(id)
    .remove()
  quoteToRemove.remove()
}

export default {
  quotesModel: quotesModel(),
  usersRef,
  addQuote,
  removeQuote,
  disconnect,
}
