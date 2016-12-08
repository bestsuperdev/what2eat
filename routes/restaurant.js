var express = require('express');
var router = express.Router();
var low = require('lowdb');
var restaurant = low('db/restaurant.json');
var util = require('../util');

router.post('/list', function(req, res) {

    var reqBody = req.body;
    var restaurantList = restaurant.get('restaurant_list').sortBy('updateTime').value().reverse();
    restaurantList.forEach(function (item, i) {
        restaurant.get('restaurant_list').find({id: item.id}).assign({id: i}).value();
    });

    var restaurantSize = restaurantList.length;
    var pageSize = reqBody.pageSize;
    var pageIndex = reqBody.pageIndex || 1;
    var pageSumNum = 0;

    if (restaurantSize > 0 && pageIndex > 0) {
        if (restaurantSize % pageSize > 0) {
            pageSumNum = Math.floor(restaurantSize / pageSize) + 1;
        } else {
            pageSumNum = restaurantSize / pageSize;
        }
    }

    if (pageSize) {
        restaurantList = restaurantList.filter(function (item, i) {
            return item.id < (pageIndex * pageSize)
        }).filter(function (item, i) {
            return item.id >= ((pageIndex - 1) * pageSize)
        }).reverse();
    }

    var resObject = {code: 0, pageIndex, pageSumNum, restaurantList};

    res.json(resObject);
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
        var newRestaurant = {id: listSize, address: req.body.address, name: req.body.name, createTime: date, updateTime: date};
        restaurant.get('restaurant_list').push(newRestaurant).value();
        var resObject = {code: 0, restaurant: newRestaurant};
        res.json(resObject);
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
        // restaurantDB.set('name', reqBody.name).value();
        restaurantDB.assign({ name: reqBody.name}).value();
    }

    if (req && reqBody.address) {
        // restaurantDB.set('address', reqBody.address).value();
        restaurantDB.assign({ address: reqBody.address}).value();
    }

    restaurantDB.set('updateTime', util.date('Y-m-d H:i:s', new Date())).value();
    var restaurantRes = restaurantDB.value();
    var resObject = {code: 0, id: restaurantRes.id, address: restaurantRes.address, name: restaurantRes.name,
        createTime: restaurantRes.createTime, updateTime: restaurantRes.updateTime};
    res.json(resObject);
});

module.exports = router;