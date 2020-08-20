const yo = require('yo-yo')
const moment = require('moment')
const { createUsernameHandler } = require('./handlers')

function Message (message) {
  const momentDate = moment(message.date).format('h:mm:ss a')
  return yo`<div class="message"><li class="msg"><span style="color: maroon"><b><i>${message.nick}:</i></b></span> ${message.text} -- ${momentDate}</li></div>`
}

function Messages (messages) {
  return yo`<ul id="messages" style="list-style-type: none">${messages.map(message => Message(message))}</ul>`
}

function Username (body, username) {
  const usernameEl = yo`<div id="username">
        <input id="username_input" placeholder="Enter username..." type="text">
        </div>`
  usernameEl.appendChild(yo`<button onclick=${createUsernameHandler(usernameEl, body, username)} id="username_btn">Submit</button>`)
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
