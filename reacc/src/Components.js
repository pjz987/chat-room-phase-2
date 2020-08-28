import React from 'react'
import moment from 'moment'

function Username (props) {
  return (
    <div id='username'>
      <input id='username-input' placeholder='Enter username...' type='text' />
      <button id='username_btn' onClick={props.onClick}>Submit</button>
    </div>
  )
}

function Messages (props) {
  if (!props.messages) return null
  return (
    <ul id='messages'>
      {props.messages.map(message => <Message key={message.id} message={message} user={props.user} />)}
    </ul>
  )
}

function StyleMessage (props) {
  const styleObj = {}
  let text = props.text
  let start = 0
  let end = 0
  let counter = 0
  while (true) {
    console.log({ text }, counter++)
    start = text.indexOf('[[')
    if (start === -1) break
    end = text.indexOf(']]')
    const style = text.slice(start, end + 2)
    text = text.split(style).join('')
    const styleArr = style.slice(2, style.length - 2).split('=')
    styleObj[styleArr[0]] = styleArr[1]
  }
  console.log({ text })
  return (
    <span style={styleObj}>{text}</span>
  )
}

function Message (props) {
  console.log(props)
  const momentDate = moment(props.message.date).format('h:mm:ss a')
  const isUser = props.message.username === props.user
  const className = props.message.username === props.user ? 'user' : 'not-user'
  return (
    <div className={isUser ? 'message end' : 'message start'}>
      <li className='msg'>
        <span className={className}><b><i>{props.message.username}:</i></b></span>
        <StyleMessage text={props.message.text} />
        <span> -- {momentDate}</span>
      </li>
    </div>
  )
}

function SelectRoom (props) {
  return (
    <select onChange={props.onChange} id='room'>
      <optgroup label='Pick a room...'>
        <option value='' id='drop-1' disabled='disabled' defaultValue className='disabled' hidden>Rooms...</option>
        {props.rooms.map(room => <option key={room}>{room}</option>)}
      </optgroup>
    </select>
  )
}

export { Username, Messages, SelectRoom }
