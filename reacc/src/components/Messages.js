import React from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

export default function Messages (props) {
  const { room } = useParams()
  props.changeRoom(room)
  console.log('messages: ', props.messages)
  // console.log(room)
  if (!room) {
    return (
      <ul
        id='messages'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h1>Choose a Room</h1>
      </ul>
    )
  }
  return (
    <ul id='messages'>
      {props.messages
        .filter(message => message.room === room)
        .map(message => {
          return (
            <Message
              key={message._id}
              message={message}
              user={props.user}
            />
          )
        }
        )}
    </ul>
  )
}

function StyleMessage (props) {
  const styleObj = {}
  let text = props.text
  let start = 0
  let end = 0
  while (true) {
    start = text.indexOf('[[')
    if (start === -1) break
    end = text.indexOf(']]')
    const style = text.slice(start, end + 2)
    text = text.split(style).join('')
    const styleArr = style.slice(2, style.length - 2).split('=')
    styleObj[styleArr[0]] = styleArr[1]
  }
  return (
    <span style={styleObj}>{text}</span>
  )
}

function Message (props) {
  const momentDate = moment(props.message.date).format('h:mm:ss a')
  const isUser = props.message.user.username === props.user
  console.log(isUser)
  const className = props.message.user.username === props.user ? 'user' : 'not-user'
  return (
    <div key={props.message.id} className={isUser ? 'message end' : 'message start'}>
      <li key={props.message.id} className='msg'>
        <span className={className}><b><i>{props.message.user.username}: </i></b></span>
        <StyleMessage text={props.message.text} />
        <span> -- {momentDate}</span>
      </li>
    </div>
  )
}
