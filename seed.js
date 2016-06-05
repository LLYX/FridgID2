'use strict';

var mongoose = require('mongoose')
  , config = require('./config')
  , Food = require('./models/food')
  , foods = require('./foods')
  , _ = require('underscore');

mongoose.connect(config.dbConnection, function(err) {
  if (err) throw new Error(err);

  Food.remove({}, function() {
    Food.create(foods, function(err, result) {
      if (err) throw new Error(err);
      console.log('Data loaded succesfully!');
      mongoose.disconnect();
    });
  });
});