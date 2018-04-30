import {combineReducers} from 'redux'
import auth from './auth'
import quotes from './quotes'
import ui from './ui'

const rootReducer = combineReducers({
  auth,
  quotes,
  ui,
})

export default rootReducer
