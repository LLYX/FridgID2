'use strict';

var twilio = require('twilio')(accountSid, authToken),
  _ = require('underscore');

var notFound = function() {
  var resp = new twilio.TwimlResponse();
  resp.message('We did not find the food you\'re looking for');
  return resp;
};

var singleFood = function(food) {
  var resp = new twilio.TwimlResponse();
  resp.message(function() {
    this.body(`${food.fullName}\n${food.phoneNumber}\n${food.email}`);
    this.media(food.imageUrl);
  });
  return resp;
};

var multipleFoods = function(foods) {
  var resp = new twilio.TwimlResponse();
  var optionsMessage = _.reduce(foods, function(memo, it) {
    return memo += `\n${it.option} for ${it.fullName}`;
  }, '');

  resp.message(`We found multiple people, reply with:${optionsMessage}\nOr start over`);
  return resp;
};

module.exports.notFound = notFound;

module.exports.singleFood = singleFood;

module.exports.multipleFoods = multipleFoods;