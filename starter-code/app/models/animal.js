var mongoose = require('mongoose')
var animalSchema = new mongoose.Schema({
  name: String,
  breed: String,
  dob: {
    type: Date,
    default: Date.now
  },
  gender: String,
  family: String,
  status: {
    type: String,
    enum: ['adopted', 'orphan']
  }
})

var Animal = mongoose.model('Animal', animalSchema)
module.exports = Animal
