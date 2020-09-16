const Message = require('../models/Message')
const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

const authenticate = (req, res, next) => {
  const authorization = req.header('Authorization') || ''
  const [type, token] = authorization.split(' ')
  if (type === 'Bearer' && jwt.verify(token, 'VERYBESTKEY')) {
    const payload = jwt.decode(token, 'VERYBESTKEY')
    req.payload = payload
    return next()
  } else {
    res.status(401).send('Unauthorized')
  }
}

// router.get('/messages', [authenticate], (req, res) => {
  
// })