import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

export default function RoomNavigator (props) {
  return (
    <Router>
      <select value={props.value} onChange={props.onChange} id='room'>
        <optgroup label='Pick a room...'>
          <option
            value=''
            id='drop-1'
            disabled='disabled'
            defaultValue
            className='disabled'
            hidden
          >
          Rooms...
          </option>
          {props.rooms.map(room => {
            return (
              <option key={room}>
                <Link to={`/rooms/${room}`} />
              </option>
            )
          }
          )}
        </optgroup>
      </select>
    </Router>
  )
}
