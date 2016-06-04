'use strict';

var Food = require('../models/food');

var findByName = function(name, callback) {
  Food.find({
    "name": {
      "$regex": name, "$options": "i"
    }
  }, callback);
};

var findById = function(id, callback) {
  Food.findOne({
    "_id": id
  }, callback);
};

module.exports.findByName = findByName;

module.exports.findById = findById;