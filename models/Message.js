const mongoose = require('mongoose')

const { Schema } = mongoose
const { ObjectId } = mongoose.Schema.Types

const messageSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
// }, {
//   toJSON: {
//     virtuals: true
//   }
})

// messageSchema.virtual('users', {
//   ref: 'User',
//   localField: '_id',
//   foreignField: 'message',
//   justOne: true
// })

module.exports = mongoose.model('Message', messageSchema)
