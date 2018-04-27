import React from 'react'
import Quote from './Quote'
import './QuoteList.css'

class QuoteList extends React.PureComponent {
  render() {
    const {quotes, removeFn, toggleLikeFn} = this.props

    return (
      <div className="QuoteList">
        {quotes.map((quote) => (
          <Quote
            key={quote.id}
            {...quote}
            removeFn={removeFn}
            toggleLikeFn={toggleLikeFn}
          />
        ))}
      </div>
    )
  }
}

export default QuoteList
