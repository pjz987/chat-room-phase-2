import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import './App.css'
// import { Username, Messages, SelectRoom, NewRoom, MessageForm } from './Components'
// import Messages from './components/Messages'
// import SelectRoom from './components/SelectRoom'
import Username from './components/Username'
import NewRoom from './components/NewRoom'
import MessageForm from './components/MessageForm'
import RoomNavigator from './components/RoomNavigator'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
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

  changeRoom = (room) => {
    this.state.room = room
    console.log(this.state)
  }

  renderMessages (messages) {
    this.setState({
      messages: messages.filter(msg => msg.room === this.state.room)
    }, () => console.log(this.state))
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
        <div>
          <RoomNavigator
            onChange={this.handleChangeRoom}
            rooms={this.state.rooms}
            value={this.state.room}
            messages={this.state.messages}
            user={this.state.user}
            changeRoom={this.changeRoom}
          />
          <div id='forms'>
            <NewRoom
              onSubmit={this.handleNewRoomSubmit}
            />
            <MessageForm
              onSubmit={this.handleSubmitMessage}
            />
          </div>
        </div>
      )
    }

    return (
      <Router>
        <link href='https://fonts.googleapis.com/css2?family=Russo+One&display=swap' rel='stylesheet' />
        <div id='header'>
          <h1>Welcome to...Chatter &copy;Billy -- All Rights Reserved</h1>
          <h1>
            <Link className='link' to='/login'>Login</Link>
            <Link className='link' to='/logout'>Logout</Link>
            <Link className='link' to='/sign-up'>Sign Up</Link>
          </h1>
        </div>
        <Switch>
          <Route path='/rooms'>
            {this.state.user ? body : <div>Login or Sign Up</div>}
          </Route>
          <Route path='/login'>
            <LogIn
              onSubmit={this.handleSubmitUser}
            />
          </Route>
          <Route path='/logout'>
            <Redirect to='/'></Redirect>
          </Route>
          <Route path='/sign-up'>
            <SignUp
              onSubmit={this.handleSubmitUser}
            />
          </Route>
          <Route path='/'>
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App
