const yo = require('yo-yo')
const socket = require('socket.io-client')()
const { Messages, Username, selectRoom } = require('./components')

const display = document.querySelector('#display-1')
display.style.display = 'none'

const body = document.querySelector('body')
const inputText = document.querySelector('#input-text')
const chatBtn = document.querySelector('#chat-btn')
const chatRoom = document.querySelector('#room')
const inputNewRoom = document.querySelector('#input-new-room')
const newRoomBtn = document.querySelector('#new-room-btn')

const el = yo`<ul></ul>`
const state = {
  name: '',
  room: '',
  display_: display
}

socket.emit('get rooms')
socket.on('get rooms', rooms => {
  state.rooms = rooms
  yo.update(chatRoom, selectRoom(rooms))
})

const usernameEl = Username(body, state)
body.appendChild(usernameEl)

chatBtn.addEventListener('click', evt => {
  socket.emit('chat message', inputText.value, state.name, state.room)
})

newRoomBtn.addEventListener('click', event => {
  state.rooms.push(inputNewRoom.value)
  inputNewRoom.value = ''
  yo.update(chatRoom, selectRoom(state.rooms))
})

chatRoom.addEventListener('change', evt => {
  state.room = chatRoom.value
  socket.emit('room', chatRoom.value)
})
socket.on('render messages', messages => {
  yo.update(el, Messages(messages.filter(msg => msg.room === state.room)))
})

body.appendChild(el)

// Mob (Pete/Billy 8/13-14/2020)
// Mob (Pete/Sam 8/19-????)
