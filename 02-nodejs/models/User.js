const mongoose = require('mongoose')

// Setup database
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:2701/mediastream-challenge')

const User = mongoose.model('User', {
  name: String,
  email: String
})

module.exports = User
