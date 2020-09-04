import React from 'react'

export default class Username extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (evt) {
    this.setState({ user: evt.target.value })
  }

  handleSubmit (evt) {
    this.props.onSubmit(this.state.user)
    evt.preventDefault()
  }

  render () {
    return (
      <form id='username' onSubmit={this.handleSubmit}>
        <input
          id='username-input'
          placeholder='Enter username...'
          type='text'
          onChange={this.handleChange}
        />
        <button id='username_btn'>Submit</button>
      </form>
    )
  }
}
