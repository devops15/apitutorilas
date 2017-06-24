var mongoose = require('mongoose');

var UserSchema   = new mongoose.Schema({
  first: String,
  last: String,
  gender: String,
  hair_colour: String,
  occupation: String,
  nationality: String
});

module.exports = mongoose.model('User', UserSchema);
