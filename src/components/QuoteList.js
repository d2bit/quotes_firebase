import React from 'react'
import Quote from './Quote'
import './QuoteList.css'

class QuoteList extends React.PureComponent {
  render() {
    const {quotes, removeFn} = this.props

    return (
      <div className="QuoteList">
        {quotes.map((quote) => (
          <Quote key={quote.id} {...quote} removeFn={removeFn} />
        ))}
      </div>
    )
  }
}

export default QuoteList
