'use strict';

var mongoose = require('mongoose');

var Food = new mongoose.Schema({
  name: String,
  amount: String,
  expiration: String,
});

module.exports = mongoose.model('food', Food);