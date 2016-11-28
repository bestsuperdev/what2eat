var express = require('express');
var router = express.Router();
var low = require('lowdb');
var restaurant = low('public/db/restaurant.json');

router.post('/', function (req, res) {
    if (!req.id) {
        return res.json({code: -1, message: 'id undefined'});
    }
    if (req && req.address && req.name) {
        restaurant.get('restaurant_list').remove({id: req.id}).value();
        res.json({code: 0});
    } else {
        res.json({code: -1, message: req});
    }
});

module.exports = router;