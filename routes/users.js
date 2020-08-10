var express = require('express');
var moment = require('moment');
var router = express.Router();
var url = require("url");
var path = require("path");
var userModel = require('../modules/usermodel');

/* GET users listing. */
router.get('/', function (req, res, next) {
  userModel.fetchBlog().then((result) => {
    res.render("userhome", { "result": result })
  }).catch((err) => {
    console.log(err)
  })
});
router.get('/course_details', function (req, res, next) {
  var courseList = url.parse(req.url, true).query.coursenm
  console.log("courseList...................", courseList)
  userModel.fetchcourse_details(courseList).then((result) => {
    res.render("viewcourseDetails", { "result": result })
  }).catch((err) => {
    console.log(err)
  })
});
router.get('/user_galary', function (req, res, next) {
  res.render("user_galary")
});
router.get('/usercourses', function (req, res, next) {
  userModel.CourseDetails().then((result) => {
    res.render("usercourses", { "result": result, })
  }).catch((err) => {
    console.log(err)
  })
});
router.get('/user_events', function (req, res, next) {
  userModel.fetchEvents().then((result) => {
    res.render("user_events", { "result": result, moment: moment })
  }).catch((err) => {
    console.log(err)
  })
});
router.get('/user_setting', function (req, res, next) {
  res.render("userSetting")
});

router.get('/logout', function (req, res, next) {
  res.redirect('/login')
});

module.exports = router;
