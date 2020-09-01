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
      rooms: [],
      messages: []
    }

    this.handleSubmitUser = this.handleSubmitUser.bind(this)
    this.handleNewRoomSubmit = this.handleNewRoomSubmit.bind(this)
    this.handleChangeRoom = this.handleChangeRoom.bind(this)
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this)
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

  handleSubmitUser (user) {
    this.setState({ user: user })
  }

  handleNewRoomSubmit (room) {
    this.setState({
      rooms: this.state.rooms.concat([room]),
      room: room
    })
    this.getMessages(messages => {
      this.renderMessages(messages)
    })
  }

  handleSubmitMessage (text) {
    this.submitMessage(text, messages => {
      this.renderMessages(messages)
    })
    this.setState({ messageText: '' })
  }

  render () {
    let body
    if (!this.state.user) {
      body = (
        <Username
          onSubmit={this.handleSubmitUser}
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
              onSubmit={this.handleNewRoomSubmit}
            />
          </div>
          <div />
          <Messages
            user={this.state.user}
            messages={this.state.messages}
          />
          <MessageForm
            onSubmit={this.handleSubmitMessage}
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
