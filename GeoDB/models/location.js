const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  location : {
    type: {type: String, default: 'Point'},
    coordinates: [Number]
},
  createdAt: {
    type: Date,
    default: Date.now
  }
});
LocationSchema.index({location:'2dsphere'})

module.exports = mongoose.model('locations', LocationSchema);