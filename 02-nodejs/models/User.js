const mongoose = require('mongoose')

// Setup database
mongoose.Promise = Promise
mongoose.connect('mongodb://127.0.0.1:27017/mediastream-challenge')

const User = mongoose.model('User', {
  name: String,
  email: String
})

module.exports = User
