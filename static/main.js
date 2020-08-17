console.log('hello world!')
const {postMessage, getMessages} = require('./fetch-messages')

const display_1 = document.querySelector('#display-1')

display_1.style.display = "none"

let state = {
  name: "",
  room: "",
  display_: display_1
}

const yo = require('yo-yo')
const {Messages, Username, selectRoom} = require('./components')

const message = document.querySelector('#messages')

const el = yo`<ul></ul>` 

const body = document.querySelector('body')
const input_text = document.querySelector('#input_text')
const chat_btn = document.querySelector('#chat_btn')
const username_el = Username(body, state)
const chat_room = document.querySelector('#room')
const input_new_room = document.querySelector('#input_new_room')
const new_room_btn = document.querySelector('#new_room_btn')


body.appendChild(username_el)

chat_btn.addEventListener("click", event => {
  postMessage(input_text.value, state.name, state.room)
  input_text.value = ""
})

new_room_btn.addEventListener("click", event => {
  state.rooms.push(input_new_room.value)
  input_new_room.value = ""
  yo.update(chat_room, selectRoom(state.rooms))
})

chat_room.addEventListener("change", event => {
  state.room = chat_room.value
})

// function postMessage (text) {
//   console.log('posting message')
//   fetch('/messages', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ text: text, date: new Date() })
//   })
//     .then(data => {
//       console.log('Success:', data)
//     })
//     .catch((error) => {
//       console.error('Error:', error)
//     })
// }

function renderMessages () {
  getMessages()
  .then(data => {
    // console.log(data)
    yo.update(el, Messages(data.filter(value => value.room === state.room)))
  })
}

// function getMessages () {
//   console.log('called getMessages')
//   fetch('/messages')
//     .then(response => response.json())
//     .then(data => {
//       console.log(data)
//       // const messages = JSON.parse(data.toString())
//       yo.update(el, Messages(data))
//     })
// }

// postMessage('hello')

// getMessages()
// setInterval(getMessages, 1000)

renderMessages()
setInterval(renderMessages, 1000)

getMessages().then(data => {
  const rooms = []
  data.forEach(message => {
    if (!rooms.includes(message.room)) {
      rooms.push(message.room)
    }
  })
  // body.appendChild(selectRoom(rooms))
  state.rooms = rooms
  yo.update(chat_room, selectRoom(rooms))
})


body.appendChild(el)

//Mob (Pete/Billy 8/13-14/2020)
