const {createUsernameHandler} = require('./handlers')

const yo = require('yo-yo')

function Message (message) {
    return yo`<div id="message"><li class="msg"><span style="color: maroon"><b><i>${message.nick}:</i></b></span>  ${message.text}</li></div>`
}

function Messages (messages) {
    return yo`<ul id="messages" style="list-style-type: none">${messages.map(message => Message(message))}</ul>`
}

function Username (body, username) {
    const username_el = yo`<div id="username">
        <input id="username_input" placeholder="Enter username..." type="text">
        </div>`
        username_el.appendChild(yo`<button onclick=${createUsernameHandler(username_el, body, username)} id="username_btn">Submit</button>`)
    return username_el
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