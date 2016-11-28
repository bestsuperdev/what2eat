var express = require('express');
var router = express.Router();
var low = require('lowdb');
var restaurant = low('public/db/restaurant.json');

router.post('/', function (req, res) {

    if (!req.id) {
        return res.json({code: -1, message: 'id undefined'});
    }

    if (req && req.address && req.name) {
        var newRestaurant = restaurant.get('restaurant_list').find({id: req.id}).set('name', req.name).value();
        res.json(newRestaurant);
    } else {
        res.json({code: -1, message: req});
    }
});

module.exports = router;