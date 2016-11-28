var express = require('express');
var router = express.Router();
var low = require('lowdb');
var restaurant = low('public/db/restaurant.json');

router.get('/list', function(req, res, next) {
    var restaurantList = restaurant.defaults().value();
    res.json(restaurantList);
});

router.post('/add', function (req, res) {
    var listSize = restaurant.get('restaurant_list').size().value();
    if (req && req.address && req.name) {
        var newRestaurant = {id: listSize, address: req.address, name: req.name};
        restaurant.get('restaurant_list').push(newRestaurant).value();
        res.json({code: 0});
    } else {
        res.json({code: -1, message: req});
    }
});

router.post('/remove', function (req, res) {
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

router.post('/edit', function (req, res) {

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