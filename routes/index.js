var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: '请选择正确路径' });
});

router.get('/admin', function(req, res, next) {
  res.render('admin', { title: '请选择正确路径' });
});

module.exports = router;