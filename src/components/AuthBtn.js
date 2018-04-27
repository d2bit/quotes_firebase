import React from 'react'
import './AuthBtn.css'

class AuthBtn extends React.PureComponent {
  render() {
    const {isAuth, logInFn, logOutFn} = this.props

    if (isAuth) {
      return <button className='AuthBtn AuthBtn-logout' onClick={logOutFn}>Logout</button>
    }

    return <button className='AuthBtn AuthBtn-login' onClick={logInFn}>Login</button>
  }
}

export default AuthBtn
