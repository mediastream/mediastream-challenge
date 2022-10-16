const mongoose = require('mongoose')

// Setup database
mongoose.Promise = Promise
mongoose.createConnection('mongodb://localhost/mediastream-challenge')

const User = mongoose.model('User', {
  name: String,
  email: String
})

module.exports = User
