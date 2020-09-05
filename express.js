const express = require('express')
const app = express()
// const fs = require('fs')
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const { openDb, writeDb } = require('./sql-db')

app.get('/', (req, res) => {
  res.json({ test: 'test' })
  console.log('work?')
})
io.on('connection', socket => {
  console.log('someone\'s on')
  socket.on('say hey', () => console.log('hey'))

  socket.on('get rooms', () => {
    openDb().then(messages => {
      console.log({ messages })
      const rooms = []
      messages.forEach(msg => {
        if (!rooms.includes(msg.room)) {
          rooms.push(msg.room)
        }
      })
      console.log(rooms)
      io.emit('get rooms', rooms)
    })
  })

  socket.on('chat message', (text, nick, room) => {
    writeDb(nick, text, room).then(messages => {
      io.emit('render messages', messages)
    })
  })

  socket.on('room', room => {
    openDb().then(messages => {
      io.emit('render messages', messages)
    })
  })

  socket.on('get messages', () => {
    openDb().then(messages => {
      console.log(messages)
      io.emit('render messages', messages)
    })
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
