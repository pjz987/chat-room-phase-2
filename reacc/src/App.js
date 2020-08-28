import React from 'react'
import logo from './logo.svg'
import './App.css'
import Username from './Components'
import io from 'socket.io-client'
const socket = io()

function socketRooms (cb) {
  socket.emit('get rooms')
  socket.on('get rooms', (rooms) => cb(rooms))
}

class App extends React.Component {
  constructor (props) {
    super(props)
    // fetch ('/')
    //   // .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     // updateState('messages', data)
    //   }).catch(err => console.log(err))
    // socket.emit('get rooms')
    // socket.on('get rooms', (rooms) => {
    //   this.setState({
    //     rooms: rooms
    //   }, () => console.log(this.state))
    // })
    this.state = {
      user: null
      // rooms: rooms
    }
  }

  testFunc () {
    console.log('test func')
  }

  setUser () {
    socket.emit('say hey')
    socketRooms(rooms => {
      this.setState({
        user: document.querySelector('#username-input').value,
        rooms: rooms
      }, () => console.log(this.state))
    })
  }

  render () {
    // socket.emit('get rooms')
    // socket.on('get rooms', rooms => {
    //   this.setState({
    //     rooms: rooms
    //   }, () => console.log(this.state))
    // })
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
            <select className='box' id='room'>
              <optgroup label='Chat rooms available...'>
                <option value='' id='drop-1' disabled='disabled' defaultValue hidden>Rooms...</option>
                {this.state.rooms.map(room => {
                  return (<option>{room}</option>)
                })}
              </optgroup>
            </select>
            <input id='input-new-room' type='text' placeholder='Create a new room...' />
            <button id='new-room-btn'>Enter</button>
          </div>
          <div />
          <ul id='messages' />
          <input id='input-text' type='text' placeholder='Enter your message...' />
          <button id='chat-btn'>Send</button>
        </div>
      </div>
    )
  }
}

export default App
