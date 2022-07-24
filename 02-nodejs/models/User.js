const mongoose = require('mongoose')

// Setup database
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost')

const User = mongoose.model('User', {
  name: String,
  email: String
})

module.exports = User
