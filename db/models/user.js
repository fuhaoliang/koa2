const mongoose = require('mongoose')
const Schema = mongoose.Schema

var UsrtSchema = new Schema({
  userName: {
    type: String,
    min: 6,
    max: 12,
    require: true,
  },
  password:{
    type: String,
    min: 6,
    max: 12,
    require: true
  },
  age: Number,
  token: {
    type: String
  },
  create_time: {
    type: Date,
    default: new Date((new Date()).getTime() + 8 * 60 * 60 * 1000)
  },
  userAvater: {
    type: String
  }
})

const User = mongoose.model('users', UsrtSchema, 'users')

module.exports = User