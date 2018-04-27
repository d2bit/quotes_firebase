import React from 'react'
import './Input.css'

class Input extends React.PureComponent {
  handleKeyDown = ({target, key}) => {
    const {onEnter} = this.props

    if (key === 'Enter') {
      onEnter && onEnter(target.value)
      target.value = ''
    }
  }

  render() {
    const {className = '', onEnter, ...props} = this.props
    return (
      <input
        className={'Input' + className}
        placeholder="Type to create a new quote..."
        onKeyDown={this.handleKeyDown}
        {...props}
      />
    )
  }
}

export default Input
