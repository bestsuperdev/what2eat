var express = require('express');
var router = express.Router();
var low = require('lowdb');
var restaurant = low('public/db/restaurant.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var restaurantList = restaurant.defaults().value();
  res.json(restaurantList);
});

module.exports = router;
