const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mediastream-challenge', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(db => {
  console.log('mongodb connected')
}).catch(err => console.log(err))

const User = mongoose.model('User', {
  name: String,
  email: String
})

module.exports = User
