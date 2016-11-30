var express = require('express');
var router = express.Router();
var low = require('lowdb');
var restaurant = low('db/restaurant.json');
var util = require('../util');

router.get('/list', function(req, res) {
    var restaurantList = restaurant.get('restaurant_list').value();
    res.json(restaurantList);
});

router.post('/save', function (req, res) {

    for (var item in req.body) {
        if (!req.body[item]) {
            return res.json({code: -1, message: item + ' undefined'});
        }
    }

    if (req.body.address && req.body.name) {
        var date = util.date('Y-m-d H:i:s', new Date());
        var listSize = restaurant.get('restaurant_list').size().value();
        var newRestaurant = {id: listSize + "", address: req.body.address, name: req.body.name, createTime: date, updateTime: date};
        restaurant.get('restaurant_list').push(newRestaurant).value();
        newRestaurant.code = 0;
        res.json(newRestaurant);
    } else {
        res.json({code: -1, message: 'save failed'});
    }
});

router.post('/remove', function (req, res) {
    if (req && req.body.id) {
        restaurant.get('restaurant_list').remove({'id': req.body.id}).value();
        res.json({code: 0});
    } else {
        return res.json({code: -1, message: 'id undefined'});
    }
});

router.post('/edit', function (req, res) {

    for (var item in req.body) {
        if (!req.body[item]) {
            return res.json({code: -1, message: item + ' undefined'})
        }
    }

    var reqBody = req.body;
    var restaurantDB = restaurant.get('restaurant_list').find({id: reqBody.id});

    if (req && reqBody.name) {
        restaurantDB.set('name', reqBody.name).value();
    }

    if (req && reqBody.address) {
        restaurantDB.set('address', reqBody.address).value();
    }

    restaurantDB.set('updateTime', util.date('Y-m-d H:i:s', new Date())).value();
    var restaurantRes = restaurantDB.value();
    var resObject = {code: 0, id: restaurantRes.id, address: restaurantRes.address, name: restaurantRes.name,
        createTime: restaurantRes.createTime, updateTime: restaurantRes.updateTime};
    res.json(resObject);
});

module.exports = router;