const mongoose = require('mongoose')

// Setup database
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/mediastream-challenge')

const User = mongoose.model('User', {
  name: String,
  email: String
})

module.exports = User

/*
  I updated the mongoose version to use newer and more accurate functions.
*/
