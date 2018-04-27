import {auth, goggleAuthProvider} from '../libs/firebase'

function subscribeEvent(callback) {
  auth.onAuthStateChanged((currentUser) => {
    const user = currentUser && {
      uid: currentUser.uid,
      name: currentUser.displayName,
      email: currentUser.email,
      photoURL: currentUser.photoURL,
    }

    return callback(user)
  })
}

function signOut() {
  return auth.signOut().catch(() => {})
}

function signInWithGoggle() {
  return auth.signInWithPopup(goggleAuthProvider).catch(() => {})
}

function currentUser() {
  return auth && auth.currentUser
}

export default {
  subscribeEvent,
  signOut,
  signInWithGoggle,
  currentUser,
}
