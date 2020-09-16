import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import './App.css'
import Username from './components/Username'
import NewRoom from './components/NewRoom'
import MessageForm from './components/MessageForm'
import RoomNavigator from './components/RoomNavigator'
import LogIn from './components/LogIn'
import LogOut from './components/LogOut'
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
      messages: [],
      token: ''
    }
  }

  getMessages = cb => {
    socket.emit('get messages', this.state.token)
    socket.on('render messages', messages => {
      console.log('getMessages: ', {messages})
      cb(messages)
    })
  }

  submitMessage =  (text, cb) => {
    socket.emit('chat message', this.state.token, text, this.state.room)
    socket.on('render messages', messages => cb(messages))
  }

  handleChangeRoom = evt => {
    this.setState({
      room: evt.target.value
    })
    this.getMessages(messages => {
      this.renderMessages(messages)
    })
  }

  changeRoom = room => {
    this.state.room = room
  }

  renderMessages = messages => {
    this.setState({
      messages: messages
    })
  }

  handleSignUp = (username, password) => {
    fetch('/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        if (res.status === 201) this.handleLogin(username, password)
      })
      .catch(err => console.log(err))
  }

  handleLogin = (username, password) => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        console.log(87)
        if (res.status === 202) return res.json()
      })
      .then(data => {
        console.log(91)
        this.setState({ token: data.token, user: username }, () => {
          console.log(93)
          this.getMessages(messages => {
            console.log('handleLogin: ', { messages })
            this.setState({
              messages: messages,
              rooms: Array.from(new Set(messages.map(msg => msg.room)))
            })
          })
        })
      })
      .catch(err => console.log(err))
  }

  handleNewRoomSubmit = (room, cb) => {
    console.log(room)
    this.setState({
      rooms: this.state.rooms.concat([room]),
      // room: room
    }, () => {
      // console.log(this.state.rooms[this.state.rooms.length - 1], 'newroomsubmit')
      cb(this.state.rooms[this.state.rooms.length - 1])
    })
  }

  handleSubmitMessage = text => {
    this.submitMessage(text, messages => {
      this.renderMessages(messages)
    })
    this.setState({ messageText: '' })
  }

  logOut = () => {
    this.setState({ user: '', token: '' })
  }

  render () {
    console.log(this.state)
    let body
    if (!this.state.user) {
      body = (
        <Username
          onSubmit={this.handleSignUp}
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
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani&display=swap" rel="stylesheet"></link>
        <div id='header'>
          <h1>Welcome to <span>chit/chat</span></h1>
          <h1>
            {this.state.user 
              ? <Link className='link' to='/logout'>Logout</Link>
              : <Link className='link' to='/login'>Login</Link>
            }
            <Link className='link' to='/sign-up'>Sign Up</Link>
          </h1>
        </div>
        <Switch>
          <Route path='/rooms'>
            {this.state.token ? body : <div>Login or Sign Up</div>}
          </Route>
          <Route path='/login'>
            <LogIn
              onSubmit={this.handleLogin}
            />
          </Route>
          <Route path='/logout'>
            <LogOut to='/' logOut={this.logOut} />
          </Route>
          <Route path='/sign-up'>
            <SignUp
              onSubmit={this.handleSignUp}
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
