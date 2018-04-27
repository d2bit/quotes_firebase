import React from 'react'
import ColorHash from 'color-hash'
import './Quote.css'

const colorHash = new ColorHash({
  hue: [{min: 30, max: 90}, {min: 180, max: 210}, {min: 270, max: 285}],
})

class Quote extends React.PureComponent {
  render() {
    const {
      id,
      quote,
      liked,
      likeCount,
      isOwner,
      removeFn,
      toggleLikeFn,
    } = this.props
    const likeClasses = ['Quote-like', liked ? 'Quote-like-on' : ''].join(' ')
    const color = colorHash.hex(quote)

    return (
      <div
        className="Quote"
        style={{backgroundColor: color}}
        onDoubleClick={() => toggleLikeFn(id)}>
        <div className="Quote-content">
          <h1 className="Quote-text">{quote}</h1>
          {isOwner && <button onClick={() => removeFn(id)}>remove</button>}
          <div className="Quote-like-info" onClick={() => toggleLikeFn(id)}>
            <svg className={likeClasses} viewBox="0 0 32 29.6">
              <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z" />
            </svg>
            {liked && <p className="Quote-like-count">{likeCount}</p>}
          </div>
        </div>
      </div>
    )
  }
}

export default Quote
