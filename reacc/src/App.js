import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Username, Messages, SelectRoom } from './Components'
import io from 'socket.io-client'
const socket = io()

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      messages: null,
      room: null
    }
  }

  socketRooms (cb) {
    socket.emit('get rooms')
    socket.on('get rooms', (rooms) => cb(rooms))
  }

  socketRoom (room, cb) {
    this.setState({
      room: room
    })
    socket.emit('room', room)
    socket.on('render messages', messages => cb(messages))
  }

  socketChat (text, cb) {
    socket.emit('chat message', text, this.state.user, this.state.room)
    socket.on('render messages', messages => cb(messages))
  }

  handleChatMessage (evt) {
    this.socketChat(document.querySelector('#input-text').value, messages => {
      this.renderMessages(messages)
    })
  }

  handleNewRoom (evt) {
    console.log(this)
    const newRoom = document.querySelector('#input-new-room').value
    this.setState({
      rooms: this.state.rooms.concat([newRoom]),
      room: newRoom
    })
  }

  setUser () {
    this.socketRooms(rooms => {
      this.setState({
        user: document.querySelector('#username-input').value,
        rooms: rooms
      }, () => console.log(this.state))
    })
  }

  handleChangeRoom (evt) {
    this.socketRoom(evt.target.value, messages => {
      this.renderMessages(messages)
    })
  }

  renderMessages (messages) {
    this.setState({
      messages: messages.filter(msg => msg.room === this.state.room)
    })
  }

  render () {
    if (!this.state.user) {
      return (
        <div>
          <div id='header'>
            <h1>Welcome to...Chatter</h1>
          </div>
          <Username onClick={() => this.setUser()} />
        </div>
      )
    }
    return (
      <div>
        <div id='header'>
          <h1>Welcome to...Chatter</h1>
        </div>
        <div id='display-1'>
          <div>
            <SelectRoom onChange={evt => this.handleChangeRoom(evt)} rooms={this.state.rooms} />
            <input id='input-new-room' type='text' placeholder='Create a new room...' />
            <button onClick={evt => this.handleNewRoom(evt)} id='new-room-btn'>Enter</button>
          </div>
          <div />
          <Messages user={this.state.user} messages={this.state.messages} />
          <input id='input-text' type='text' placeholder='Enter your message...' />
          <button onClick={evt => this.handleChatMessage(evt)} id='chat-btn'>Send</button>
        </div>
      </div>
    )
  }
}

export default App
