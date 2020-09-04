import React from 'react'

export default class MessageForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (evt) {
    this.setState({ text: evt.target.value })
  }

  handleSubmit (evt) {
    this.props.onSubmit(this.state.text)
    this.setState({ text: '' })
    evt.preventDefault()
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          value={this.state.text}
          id='input-text'
          type='text'
          placeholder='Enter your message...'
        />
        <button id='chat-btn'>Send</button>
      </form>
    )
  }
}
