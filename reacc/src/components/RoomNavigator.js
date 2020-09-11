import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import chroma from 'chroma-js'
import Messages from './Messages'
// import NewRoom from './NewRoom'

export default function RoomNavigator (props) {
  const colors = chroma.scale(['yellow', 'navy']).mode('lch')
  return (
    <Router>
      <main>
        <nav className='rooms'>
          <header className='rooms'>Rooms:</header>
          <div className='rooms'>
            {props.rooms.map((room, i) => {
              // const colorNum = (i / props.rooms.length) + (i * )
              const color = colors(i / (props.rooms.length - 1))
              console.log(color)
              return (
                <div className='link' key={i}>
                  <Link style={{ color: color }} className='link' to={`/rooms/${room}`}>{room}</Link>
                </div>
              )
            })}
          </div>
        </nav>
        <Switch>
          {props.rooms.map((room, i) => {
            return (
              <Route
                key={i}
                path='/rooms/:room'
                children={
                  <Messages
                    changeRoom={props.changeRoom}
                    messages={props.messages}
                    user={props.user}
                  />
                }
              />
            )
          })}
          <Route
            path='/rooms'
            children={
              <Messages
                changeRoom={props.changeRoom}
                messages={props.messages}
                user={props.user}
              />
            }
          />
        </Switch>
      </main>
    </Router>
  )
}
