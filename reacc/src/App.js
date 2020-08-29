import React from 'react'
import './App.css'
import { Username, Messages, SelectRoom, NewRoom, MessageForm } from './Components'
import io from 'socket.io-client'
const socket = io()

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      room: '',
      inputUser: '',
      rooms: [],
      newRoom: '',
      messages: [],
      messageText: ''
    }

    this.handleSubmitUser = this.handleSubmitUser.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
    this.handleNewRoomChange = this.handleNewRoomChange.bind(this)
    this.handleNewRoomSubmit = this.handleNewRoomSubmit.bind(this)
    this.handleChangeRoom = this.handleChangeRoom.bind(this)
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this)
    this.handleChangeMessage = this.handleChangeMessage.bind(this)
  }

  componentDidMount () {
    this.getMessages(messages => {
      this.setState({
        messages: messages,
        rooms: Array.from(new Set(messages.map(msg => msg.room)))
      }, () => console.log(this.state))
    })
  }

  getMessages (cb) {
    socket.emit('get messages')
    socket.on('render messages', messages => cb(messages))
  }

  submitMessage (text, cb) {
    socket.emit('chat message', text, this.state.user, this.state.room)
    socket.on('render messages', messages => cb(messages))
  }

  handleChangeRoom (evt) {
    this.setState({
      room: evt.target.value
    })
    this.getMessages(messages => {
      this.renderMessages(messages)
    })
  }

  renderMessages (messages) {
    this.setState({
      messages: messages.filter(msg => msg.room === this.state.room)
    })
  }

  handleSubmitUser (evt) {
    this.setState({ user: this.state.inputUser })
    evt.preventDefault()
  }

  handleUserChange (evt) {
    this.setState({ inputUser: evt.target.value })
  }

  handleNewRoomChange (evt) {
    this.setState({ newRoom: evt.target.value })
  }

  handleNewRoomSubmit (evt) {
    this.setState({
      rooms: this.state.rooms.concat([this.state.newRoom]),
      room: this.state.newRoom,
      newRoom: ''
    })
    this.getMessages(messages => {
      this.renderMessages(messages)
    })
    evt.preventDefault()
  }

  handleChangeMessage (evt) {
    this.setState({ messageText: evt.target.value })
  }

  handleSubmitMessage (evt) {
    this.submitMessage(this.state.messageText, messages => {
      this.renderMessages(messages)
    })
    this.setState({ messageText: '' })
    evt.preventDefault()
  }

  render () {
    let body
    if (!this.state.user) {
      body = (
        <Username
          onSubmit={this.handleSubmitUser}
          onChange={this.handleUserChange}
        />
      )
    } else {
      body = (
        <div id='display-1'>
          <div>
            <SelectRoom
              onChange={this.handleChangeRoom}
              rooms={this.state.rooms}
              value={this.state.room}
            />
            <NewRoom
              value={this.state.newRoom}
              onSubmit={this.handleNewRoomSubmit}
              onChange={this.handleNewRoomChange}
            />
          </div>
          <div />
          <Messages
            user={this.state.user}
            messages={this.state.messages}
          />
          <MessageForm
            value={this.state.messageText}
            onSubmit={this.handleSubmitMessage}
            onChange={this.handleChangeMessage}
          />
        </div>
      )
    }

    return (
      <div>
        <link href='https://fonts.googleapis.com/css2?family=Russo+One&display=swap' rel='stylesheet' />
        <div id='header'>
          <h1>Welcome to...Chatter</h1>
        </div>
        {body}
      </div>
    )
  }
}

export default App

// setUser () {
//   this.socketRooms(rooms => {
//     this.setState({
//       user: document.querySelector('#username-input').value,
//       rooms: rooms
//     }, () => console.log(this.state))
//   })
// }

// handleChatMessage (evt) {
//   this.socketChat(document.querySelector('#input-text').value, messages => {
//     this.renderMessages(messages)
//   })
// }

// socketRooms (cb) {
//   socket.emit('get rooms')
//   socket.on('get rooms', (rooms) => cb(rooms))
// }

// socketRoom (room, cb) {
//   this.setState({
//     room: room
//   })
//   socket.emit('room', room)
//   socket.on('render messages', messages => cb(messages))
// }

// handleNewRoom (evt) {
//   console.log(this)
//   const newRoom = document.querySelector('#input-new-room').value
//   this.setState({
//     rooms: this.state.rooms.concat([newRoom]),
//     room: newRoom
//   })
// }

// if (!this.state.user) {
//   return (
//     <div>
//       <link href='https://fonts.googleapis.com/css2?family=Russo+One&display=swap' rel='stylesheet' />
//       <div id='header'>
//         <h1>Welcome to...Chatter</h1>
//       </div>
//       <Username onSubmit={this.handleSubmitUser} onChange={this.handleUserChange} />
//     </div>
//   )
// }
// return (
//   <div>
//     <link href='https://fonts.googleapis.com/css2?family=Russo+One&display=swap' rel='stylesheet' />
//     <div id='header'>
//       <h1>Welcome to...Chatter</h1>
//     </div>
//     <div id='display-1'>
//       <div>
//         <SelectRoom onChange={this.handleChangeRoom} rooms={this.state.rooms} value={this.state.room} />
//         <NewRoom value={this.state.newRoom} onSubmit={this.handleNewRoomSubmit} onChange={this.handleNewRoomChange} />
//       </div>
//       <div />
//       <Messages user={this.state.user} messages={this.state.messages} />
//       <MessageForm value={this.state.messageText} onSubmit={this.handleSubmitMessage} onChange={this.handleChangeMessage} />
//     </div>
//   </div>
// )
