const User = require('../models/User')
const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

// const authenticate = (req, res, next) => {
//   const authorization = req.header('Authorization') || ''
//   const [type, token] = authorization.split(' ')
//   if (type === 'Bearer' && jwt.verify(token, 'VERYBESTKEY')) {
//     const payload = jwt.decode(token, 'VERYBESTKEY')
//     req.payload = payload
//     return next()
//   } else {
//     res.status(401).send('Unauthorized')
//   }
// }

router.post('/sign-up', (req, res) => {
  User.findOne({ username: req.body.username }, async (err, userExists) => {
    if (err) return res.status(500).send(err)
    if (userExists) return res.status(400).send({ err: 'username already exists' })

    const user = await User.signUp(req.body.username, req.body.password)
    res.status(201).send(user.sanitized())
  })
})

router.post('/login', (req, res) => {
  console.log('/login')
  console.log(req.body)
  User.findOne({ username: req.body.username }, async (err, user) => {
    if (err) return res.status(500).send({ err })
    console.log(user)
    const matchingPassword = await user.comparePassword(req.body.password)

    if (!user || !matchingPassword) return res.status(400).send({ err: 'Invalid login info' })

    const token = jwt.sign({
      _id: user._id
    }, 'VERYBESTKEY')

    res.status(202).send({ token })
  })
})

module.exports = router
