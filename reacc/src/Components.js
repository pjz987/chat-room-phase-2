import React from 'react'
import moment from 'moment'
import styleMessage from './style-message'
// import { Username } from '../../static/components'
// import createUsernameHandler from './handlers'

function Username (props) {
  return (
    <div id='username'>
      <input id='username-input' placeholder='Enter username...' type='text' />
      <button id='username_btn' onClick={props.onClick}>Submit</button>
    </div>
  )
}

export default Username
