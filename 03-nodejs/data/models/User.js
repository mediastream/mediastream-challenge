const mongoose = require('mongoose');
mongoose.Promise = Promise;

const User = mongoose.model('User', {
  name: String,
  email: String,
});

module.exports = User;