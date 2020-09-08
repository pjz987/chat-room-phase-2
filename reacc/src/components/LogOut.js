import React from 'react'
import { Redirect } from 'react-router-dom'

export default function LogOut (props) {
  props.logOut()
  return <Redirect to='/' />
}
