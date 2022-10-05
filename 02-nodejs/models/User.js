const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

// Setup database
mongoose.Promise = Promise
mongoose.connect('mongodb://alex:123123@localhost:27018/mediastream?authSource=admin')

const userSchema = new mongoose.Schema({
    name: {
      type: String
    },
    email: {
      type: String
    },
})

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);

module.exports = User
