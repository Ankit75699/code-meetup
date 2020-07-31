var express = require('express');
var indexModel = require('../modules/indexmodel')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { "msg": "" });
});
router.get('/register', function (req, res, next) {
  res.render('register', { "msg": "" });
});
router.post('/register', function (req, res, next) {
  indexModel.registration(req.body).then((result) => {
    res.render('register', result);
  }).catch((err) => {
    console.log(err)
  })
});
router.get('/login', function (req, res, next) {
  res.render('login', { "msg": "" });
});
router.post('/login', function (req, res, next) {
  indexModel.login(req.body).then((result) => {
    if (result.length == 0)
      res.render('login', { 'msg': 'Invalid user please login again or verify account....' });
    else {
      if (result[0].role == "admin")
        res.redirect("/admin")
      else
        res.redirect("/user")
    }
  }).catch((err) => {
    console.log(err)
  })
});

router.get('/about', function (req, res, next) {
  res.render('about');
});
router.get('/courses', function (req, res, next) {
  res.render('courses');
});

router.get('/contact', function (req, res, next) {
  res.render('contact');
});
module.exports = router;
