const yo = require('yo-yo')
const moment = require('moment')
const { createUsernameHandler } = require('./handlers')
const styleMessage = require('./style-message')

function Message (message, state) {
  const styleObj = styleMessage(message.text)
  console.log(message.date)
  const momentDate = moment(message.date).format('h:mm:ss a')
  return yo`<div class="message${message.username === state.name ? ' end' : ' start'}" >
    <li class="msg" style="align: right">
      <span style="${message.username === state.name ? 'color: #ba6c48' : 'color: #8f2543'}"><b><i>${message.username}:</i></b></span>
      <span style="${styleObj.outStyle}">${styleObj.outText}</span>
      <span> -- ${momentDate}</span>
    </li>
  </div>`
}

function Messages (messages, state) {
  return yo`<ul id="messages" style="list-style-type: none">
    ${messages.map(message => Message(message, state))}
    <div></div>
  </ul>`
}

function Username (body, state) {
  const usernameEl = yo`<div id="username">
        <input id="username_input" placeholder="Enter username..." type="text">
        </div>`
  usernameEl.appendChild(yo`<button onclick=${createUsernameHandler(usernameEl, body, state)} id="username_btn">Submit</button>`)
  return usernameEl
}

function selectRoom (rooms) {
  return yo`<select id="room">
    <optgroup label="Pick a room..." >
    <option value="" id="drop-1" disabled="disabled" selected="selected" style="color: grey" hidden>Rooms...</option>
    ${rooms.map(room => {
        return yo`<option value="${room}">${room}</option>`
    })}
    </optgroup>
    </select>`
}

module.exports = {
  Message,
  Messages,
  Username,
  selectRoom
}
