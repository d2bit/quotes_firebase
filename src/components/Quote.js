import React from 'react'
import './Quote.css'

class Quote extends React.PureComponent {
  render() {
    const {id, removeFn} = this.props

    return (
      <div className="Quote">
        <div className="Quote-content">
          <pre>{JSON.stringify(this.props, null, 2)}</pre>
          <button onClick={() => removeFn(id)}>remove</button>
        </div>
      </div>
    )
  }
}

export default Quote
