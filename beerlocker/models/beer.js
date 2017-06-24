var mongoose = require('mongoose');

var BeerSchema   = new mongoose.Schema({
  name: String,
  last: String,
  gender: String,
  nationality: String,
  salary: Number
});

module.exports = mongoose.model('Beer', BeerSchema);
