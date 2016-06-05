'use strict';

var express = require('express')
  , router = express.Router()
  , accountSid = 'ACd489c9c5671e1260e7c68e4c80faca5f'
  , authToken = 'e0f670bb39bdf49951bf6fc7889e4cd8'
  , twilio = require('twilio')(accountSid, authToken)
  , foodFinder = require('../lib/food-finder')
  , _ =  require('underscore')
  , twimlGenerator = require('../lib/twiml-generator');

// POST /server/search/
router.post('/search/', function(req, res, next) {
  var body = req.body.Body;
  res.type('text/xml');

  if (req.cookies.cachedFoods !== undefined && !isNaN(body)) {
    var cachedFoods = req.cookies.cachedFoods;
    var foodId = cachedFoods[body];
    if (foodId === undefined) {
      res.send(twimlGenerator.notFound().toString());
    } else {
      foodFinder.findById(foodId, function(err, food) {
        res.clearCookie('cachedFoods');
        res.send(twimlGenerator.singleFood(food).toString());
      });
    }
  } else {
    foodFinder.findByName(body, function(err, foods) {
      if (foods.length === 0) {
        res.send(twimlGenerator.notFound().toString());
      } else if (foods.length === 1) {
        res.send(twimlGenerator.singleFood(foods[0]).toString());
      } else {
        var options = _.map(foods, function(it, index) {
          return { option: index + 1, fullName: it.fullName, id: it.id };
        });
        var cachedFoods = _.object(_.map(options, function(it) { return [it.option, it.id]; }));
        res.cookie('cachedFoods', cachedFoods, { maxAge: 1000 * 60 * 60 });

        res.send(twimlGenerator.multipleFoods(options).toString());
      }
    });
  }
});

module.exports = router;