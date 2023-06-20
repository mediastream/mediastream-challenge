const mongoose = require('mongoose')

const MONGODB_USER = 'root'
const MONGODB_PASS = 'root'
const MONGODB_HOST = 'localhost'
const MONGODB_NAME = 'mediastream-challenge'

// Setup database
mongoose.Promise = Promise
mongoose.connect(`mongodb://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_HOST}/${MONGODB_NAME}?authSource=admin`)

const User = mongoose.model('User', {
  name: String,
  email: String
})

module.exports = User
