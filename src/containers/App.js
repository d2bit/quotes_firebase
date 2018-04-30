import React from 'react'
import {connect} from 'react-redux'
import {
  authLoginRequest,
  authLogoutRequest,
  subscribeToFirebaseEvents,
  unsubscribeFromFirebaseEvents,
  addQuote,
  removeQuote,
  toggleLike,
  clearUIError,
} from '../actions'
import QuoteList from '../components/QuoteList'
import AuthBtn from '../components/AuthBtn'
import Input from '../components/Input'
import './App.css'

class App extends React.PureComponent {
  componentDidMount() {
    this.props.subscribeToFirebaseEvents()
  }
  componentWillUnMount() {
    this.props.unsubscribeFromFirebaseEvents()
  }

  render() {
    const {quotes, isFetching} = this.props
    const isData = quotes.length > 0
    const {uid} = this.props
    const isAuth = !!uid
    const {addQuote, removeQuote, toggleLike} = this.props
    const {authLoginRequest, authLogoutRequest} = this.props
    const {error, clearUIError} = this.props

    if (error) {
      //TODO show error in modal
      console.log(error)
      setTimeout(clearUIError, 100)
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">QUOTES</h1>
          <AuthBtn isAuth={isAuth} logInFn={authLoginRequest} logOutFn={authLogoutRequest} />
        </header>
        <div className="App-content">
          <Input onEnter={addQuote} />
          {!isData && isFetching && <div className="App-loading" />}
          {isData &&
            <QuoteList quotes={quotes} removeFn={removeQuote} toggleLikeFn={toggleLike} />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  quotes: state.quotes,
  isFetching: state.ui.isFetching,
  uid: state.auth.uid,
  error: state.ui.error,

})
const mapDispatchToProps = {
  subscribeToFirebaseEvents,
  unsubscribeFromFirebaseEvents,
  addQuote,
  removeQuote,
  toggleLike,
  authLoginRequest,
  authLogoutRequest,
  clearUIError,
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
