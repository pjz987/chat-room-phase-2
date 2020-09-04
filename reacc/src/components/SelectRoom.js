import React from 'react'

export default function SelectRoom (props) {
  return (
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
        {props.rooms.map(room => <option key={room}>{room}</option>)}
      </optgroup>
    </select>
  )
}
