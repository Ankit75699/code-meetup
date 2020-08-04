var express = require('express');
var router = express.Router();
var userModel = require('../modules/usermodel');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render("userhome")
});
router.get('/usercourses', function (req, res, next) {
  userModel.CourseDetails().then((result) => {
    res.render("usercourses", { "result": result })
  }).catch((err) => {
    console.log(err)
  })
});
router.get('/user_events', function (req, res, next) {
  userModel.fetchEvents().then((result) => {
    console.log("result.......", result)
    res.render("user_events", { "result": result })
  }).catch((err) => {
    console.log(err)
  })
});

router.get('/logout', function (req, res, next) {
  res.redirect('/login')
});

module.exports = router;
