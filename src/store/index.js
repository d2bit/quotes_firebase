import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {authorization, authentication, database} from '../middlewares'
import rootReducer from '../reducers'

const store = createStore(
  rootReducer,
  applyMiddleware(authorization, authentication, database, thunk),
)

export default store
