import React from 'react'
import database, {addQuote, removeQuote, toggleLike} from '../libs/database'
import auth from '../libs/auth'
import QuoteList from '../components/QuoteList'
import AuthBtn from '../components/AuthBtn'
import Input from '../components/Input'
import './App.css'

class App extends React.PureComponent {
  state = {
    isFetching: true,
    quotes: [],
    isAuth: undefined,
    user: null,
  }

  componentDidMount() {
    this.connectToDatabase()
  }
  componentWillUnMount() {
    database.disconnect()
  }

  connectToDatabase = () => {
    auth.subscribeEvent(currentUser => {
      const isAuth = !!currentUser
      this.setState({ isAuth, user: currentUser })
    })

    const Quote = database.quotesModel
    Quote.subscribeChildEvent('child_added', newQuote => {
      const quotes = [newQuote, ...this.state.quotes]

      this.setState({isFetching: false, quotes})
    })
    Quote.subscribeChildEvent('child_changed', updatedQuote => {
      const updatedQuotes = [...this.state.quotes]
      const updatedIndex = updatedQuotes.findIndex(quote => quote.id === updatedQuote.id)
      updatedQuotes[updatedIndex] = updatedQuote

      this.setState({isFetching: false, quotes: updatedQuotes})
    })
    Quote.subscribeChildEvent('child_removed', removedQuote => {
      const quotes = this.state.quotes.filter(
        (quote) => quote.id !== removedQuote.id,
      )

      this.setState({isFetching: false, quotes})
    })
  }

  login() {
    auth.signInWithGoggle()
  }
  logout() {
    auth.signOut()
  }

  render() {
    const {isAuth, isFetching, quotes} = this.state
    const isData = quotes.length > 0

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">QUOTES</h1>
          { isAuth !== undefined &&
            <AuthBtn isAuth={isAuth} logInFn={this.login} logOutFn={this.logout} />
          }
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

export default App
