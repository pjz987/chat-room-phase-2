import React from 'react'

export default class NewRoom extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      room: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (evt) {
    this.setState({ room: evt.target.value })
  }

  handleSubmit (evt) {
    this.props.onSubmit(this.state.room)
    this.setState({ room: '' })
    evt.preventDefault()
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit} style={{ display: 'inline' }}>
        <input
          onChange={this.handleChange}
          value={this.state.room}
          id='input-new-room'
          type='text'
          placeholder='Create a new room...'
        />
        <button id='new-room-btn'>Enter</button>
      </form>
    )
  }
}
