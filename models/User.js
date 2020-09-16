const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { Schema } = mongoose
const { ObjectId } = mongoose.Schema.Types

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  message: {
    type: ObjectId,
    ref: 'Message',
    required: false
  }
})

userSchema.methods.sanitized = function () {
  return {
    ...this._doc,
    password: undefined
  }
}

userSchema.statics.signUp = async function (username, password) {
  const user = new this()
  user.username = username
  await user.hashPassword(password)
  await user.save()
  return user
}

userSchema.methods.hashPassword = function (password) {
  const user = this
  return bcrypt.hash(password, 10).then(hash => {
    user.password = hash
  })
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema)
