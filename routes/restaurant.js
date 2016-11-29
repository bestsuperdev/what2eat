var express = require('express');
var router = express.Router();
var low = require('lowdb');
var restaurant = low('db/restaurant.json');

router.get('/list', function(req, res, next) {
    var restaurantList = restaurant.get('restaurant_list').value();
    console.log('cookies: ', req.body.cookies);
    res.json(restaurantList);
});

router.post('/add', function (req, res) {
    if (req && req.body.address && req.body.name) {
        var listSize = restaurant.get('restaurant_list').size().value();
        var newRestaurant = {id: listSize + "", address: req.body.address, name: req.body.name};
        restaurant.get('restaurant_list').push(newRestaurant).value();
        res.json({code: 0, id: listSize});
    } else {
        res.json({code: -1, message: req});
    }
});

router.post('/remove', function (req, res) {
    if (req && req.body.id) {
        restaurant.get('restaurant_list').remove({'id': req.body.id}).value();
        console.log(restaurant.get('restaurant_list').value());
        res.json({code: 0});
    } else {
        return res.json({code: -1, message: 'id undefined'});
    }
});

router.post('/edit', function (req, res) {
    if (!req.body.id) {
        return res.json({code: -1, message: 'id undefined'});
    }

    if (req && req.body.address) {
        restaurant.get('restaurant_list').find({id: req.body.id}).set('address', req.body.address).value();
    }

    if (req && req.body.name) {
        restaurant.get('restaurant_list').find({id: req.body.id}).set('name', req.body.name).value();
    }

    var restaurantRes = restaurant.get('restaurant_list').find({id: req.body.id}).value();
    res.json(restaurantRes);
});

module.exports = router;