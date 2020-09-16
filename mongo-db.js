const Message = require('./models/Message')
const jwt = require('jsonwebtoken')

const authenticate = token => {
  if (jwt.verify(token, 'VERYBESTKEY')) {
    const payload = jwt.decode(token, 'VERYBESTKEY')
    return payload
  } else {
    return console.log('Failed user authentication.')
  }
}

const getMessages = cb => {
  Message.find({})
    .populate('user', 'username')
    .exec((err, messages) => {
      if (err) return console.log(err)
      console.log('databases getMessages: ', { messages })
      cb(messages)
    })
}

const postMessage = async (payload, text, room, cb) => {
  const message = await new Message({
    user: payload._id,
    text: text,
    room: room,
    date: new Date()
  })
  message.save(async err => {
    if (err) return console.log(err)
    getMessages(messages => cb(messages))
    // return messages
  })
}

module.exports = {
  authenticate,
  getMessages,
  postMessage
}
