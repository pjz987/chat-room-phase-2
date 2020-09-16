const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const AuthController = require('./controllers/auth')
// const ProtectedRoutes = require('./controllers/protected')
// const { openDb, writeDb } = require('./sql-db')
const { authenticate, getMessages, postMessage } = require('./mongo-db')

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.json())
app.use(morgan('tiny'))

app.use('/', AuthController)
// app.use('/', ProtectedRoutes)

app.get('/', (req, res) => {
  res.json({ test: 'test' })
  console.log('work?')
})
io.on('connection', socket => {
  console.log('someone\'s on')

  socket.on('chat message', async (token, text, room) => {
    const payload = await authenticate(token)
    if (!payload) return
    const messages = await postMessage(payload, text, room, messages => {
      console.log('socket.on(\'chat message\'', { messages })
      io.emit('render messages', messages)
    })
  })

  socket.on('get messages', async token => {
    const payload = await authenticate(token)
    console.log({ payload })
    if (!payload) return
    getMessages(messages => {
      console.log('socket.on(\'get messages \'', { messages })
      if (messages) io.emit('render messages', messages)
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

const connectDatabase = async (dbName = 'chat-app', hostname = 'localhost') => {
  const db = await mongoose.connect(
    `mongodb://${hostname}/${dbName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  console.log(`Database connected at mongodb://${hostname}/${dbName}...`)
  return db
}

const startServer = port => {
  http.listen(port, async () => {
    await connectDatabase()
    console.log(`Server listening on port ${port}...`)
  })
}

startServer(8000)
