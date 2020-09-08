import React from 'react'
import { Redirect } from 'react-router-dom'

export default class SignUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      password1: '',
      password2: '',
      redirect: false
    }
  }

  handleChangeName = evt => {
    this.setState({ user: evt.target.value })
  }

  handleChangePassword1 = evt => {
    this.setState({ password1: evt.target.value })
  }

  handleChangePassword2 = evt => {
    this.setState({ password2: evt.target.value })
  }

  handleSubmit = evt => {
    if (this.state.password1 === this.state.password2) {
      this.props.onSubmit(this.state.user)
      evt.preventDefault()
      this.setState({ redirect: true })
    }
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to='/rooms'></Redirect>
    }
    return (
      <form id='username' onSubmit={this.handleSubmit}>
        <input
          className='username-password'
          placeholder='Choose username..'
          type='text'
          onChange={this.handleChangeName}
        />
        <input
          className='username-password'
          placeholder='Enter
          password'
          type='password'
          onChange={this.handleChangePassword1}
        />
        <input
          className='username-password'
          placeholder='Enter
          password'
          type='password'
          onChange={this.handleChangePassword2}
        />
        <button>Log In</button>
      </form>
    )
  }
}
