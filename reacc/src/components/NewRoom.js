import React from 'react'
import { useHistory } from 'react-router-dom'

export default function NewRoom (props) {
  const history = useHistory()
  function redirectNewRoom (room) {
    console.log('this line', room)
    // if (err) return console.log(err)
    history.push(`/rooms/${room}`)
  }
  return <NewRoomForm
    onSubmit={props.onSubmit}
    redirectNewRoom={redirectNewRoom}
  />
}

class NewRoomForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      room: ''
    }
  }

  handleChange = evt => {
    this.setState({ room: evt.target.value })
  }

  handleSubmit = evt => {
    this.props.onSubmit(this.state.room, () => this.props.redirectNewRoom(this.state.room))
    this.setState({ room: '' })
    evt.preventDefault()
  }

  render () {
    console.log(this)
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
