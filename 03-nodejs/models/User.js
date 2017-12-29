const mongoose = require('mongoose');
const mongooseToCsv = require('mongoose-csv');

const UserSchema = new mongoose.Schema({
  name  : {type: String},
  email : {type: String},
});

UserSchema.plugin(mongooseToCsv);

module.exports = mongoose.model('User', UserSchema);
