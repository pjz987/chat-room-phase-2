const express = require('express')
const app = express()
const fs = require('fs')
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const MESSAGES_PATH = './messages.txt'

function readDb (cb) {
  fs.readFile(MESSAGES_PATH, (err, data) => {
    if (err) return console.log(err)
    const lines = data.toString().split('\n')
    const messages = lines.filter(line => line !== '').map(line => JSON.parse(line))
    cb(messages)
  })
}

app.use(express.static('static'))

io.on('connection', socket => {
  socket.on('get rooms', () => {
    readDb((messages) => {
      const rooms = []
      messages.forEach(msg => {
        if (!rooms.includes(msg.room)) {
          rooms.push(msg.room)
        }
      })
      io.emit('get rooms', rooms)
    })
  })

  socket.on('chat message', (text, nick, room) => {
    const data = JSON.stringify({ text, nick, room, date: new Date() })
    fs.appendFile(MESSAGES_PATH, data + '\n', err => {
      if (err) return console.log(err)
      readDb((messages) => {
        io.emit('render messages', messages)
      })
    })
  })

  socket.on('room', room => {
    readDb(messages => {
      io.emit('render messages', messages)
    })
  })
})

http.listen(8000)
