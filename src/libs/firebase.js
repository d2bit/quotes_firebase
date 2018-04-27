import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAwnYPvI1uYZfwsdfKBcCPbF_vh9NCNTvU',
  authDomain: 'quotes-69019.firebaseapp.com',
  databaseURL: 'https://quotes-69019.firebaseio.com',
  projectId: 'quotes-69019',
  storageBucket: 'quotes-69019.appspot.com',
  messagingSenderId: '808453709663',
}
firebase.initializeApp(config)

export const db = firebase.database()
export const auth = firebase.auth()
export const goggleAuthProvider = new firebase.auth.GoogleAuthProvider()

export default firebase
