const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: { type: String },
  email: { type: String }
}, { collections: 'users' })
userSchema.index({ name: 1, email: 1 })

module.exports = mongoose.model('User', userSchema)
