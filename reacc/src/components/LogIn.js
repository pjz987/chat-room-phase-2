import React from 'react'
import { Redirect } from 'react-router-dom'

export default class LogIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      password: '',
      redirect: false
    }
  }

  handleChangeName = evt => {
    this.setState({ user: evt.target.value })
  }

  handleChangePassword = evt => {
    this.setState({ password: evt.target.value })
  }

  handleSubmit = evt => {
    this.props.onSubmit(this.state.user)
    evt.preventDefault()
    this.setState({ redirect: true })
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to='/rooms'></Redirect>
    }
    return (
      <form id='username' onSubmit={this.handleSubmit}>
        <input
          className='username-password'
          placeholder='Enter
          username'
          type='text'
          onChange={this.handleChangeName}
        />
        <input
          className='username-password'
          placeholder='Enter
          password'
          type='password'
          onChange={this.handleChangePassword}
        />
        <button>Log In</button>
      </form>
    )
  }
}
