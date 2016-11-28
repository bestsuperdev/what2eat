var express = require('express');
var router = express.Router();
var low = require('lowdb');
var restaurant = low('public/db/restaurant.json');

router.post('/', function (req, res) {
    var listSize = restaurant.get('restaurant_list').size().value();
    if (req && req.address && req.name) {
        var newRestaurant = {id: listSize, address: req.address, name: req.name};
        restaurant.get('restaurant_list').push(newRestaurant).value();
        res.json({code: 0});
    } else {
        res.json({code: -1, message: req});
    }
});

module.exports = router;