var express = require('express');
var router = express.Router();
var low = require('lowdb');
var db = low('public/db/restaurant.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var dbValue = db.defaults()
      .value();
  res.send(JSON.stringify(dbValue));
});

module.exports = router;
