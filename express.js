const express = require('express')
const app = express()
// const fs = require('fs')
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const { openDb, writeDb } = require('./sql-db')
// const MESSAGES_PATH = './messages.txt'

// function readDb (cb) {
//   fs.readFile(MESSAGES_PATH, (err, data) => {
//     if (err) return console.log(err)
//     const lines = data.toString().split('\n')
//     const messages = lines.filter(line => line !== '').map(line => JSON.parse(line))
//     cb(messages)
//   })
// }

app.use(express.static('static'))

io.on('connection', socket => {
  socket.on('get rooms', () => {
    openDb().then(messages => {
      console.log(messages)
      const rooms = []
      messages.forEach(msg => {
        if (!rooms.includes(msg.room)) {
          rooms.push(msg.room)
        }
      })
      console.log(rooms)
      io.emit('get rooms', rooms)
    })
    // readDb((messages) => {
    // })
  })

  socket.on('chat message', (text, nick, room) => {
    writeDb(nick, text, room).then(messages => {
      io.emit('render messages', messages)
    })
    // const data = JSON.stringify({ text, nick, room, date: new Date() })
    // fs.appendFile(MESSAGES_PATH, data + '\n', err => {
    //   if (err) return console.log(err)
    //   readDb((messages) => {
    //     io.emit('render messages', messages)
    //   })
    // })
  })

  socket.on('room', room => {
    openDb().then(messages => {
      io.emit('render messages', messages)
    })
    // readDb(messages => {
    // })
  })

  let typing

  socket.on('typing', user => {
    typing = true
    io.emit('typing', user)
    setTimeout(() => {
      if (!typing) io.emit('stop typing')
    }, 1000)
    typing = false
  })
})

http.listen(8000)
