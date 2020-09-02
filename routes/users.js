var express = require('express');
var moment = require('moment');
var router = express.Router();
var url = require("url");
var path = require("path");
var userModel = require('../modules/usermodel');
var indexModel = require('../modules/indexmodel')


/* Middleware to check user authentication */
router.use((req, res, next) => {
  if (req.session.sunm == undefined || req.session.srole != "user") {
    req.session.destroy();
    res.redirect("/logout")
  }
  next()
})
/* Middleware to get course list */
var subcourseList
router.use("/course_details", (req, res, next) => {
  var courseList = url.parse(req.url, true).query.coursenm
  userModel.fetchsubcourse_details(courseList).then((result) => {
    subcourseList = result
    next();
  }).catch((err) => {
    console.log(err)
  })
})
router.use("/course_details", (req, res, next) => {
  var coursestatus = url.parse(req.url, true).query
  userModel.course_status(coursestatus).then((result) => {
    next()
  }).catch((err) => {
    console.log(err)
  })
})
var cstatus
router.use("/course_details", (req, res, next) => {
  userModel.Fetch_cstatusDetails().then((result) => {
    cstatus = result[0].cstatus
    next()
  }).catch((err) => {
    console.log(err)
  })
})


/* GET users listing. */
router.get('/', function (req, res, next) {
  userModel.fetchBlog().then((result) => {
    res.render("userhome", { "result": result, "sunm": req.session.sunm })
  }).catch((err) => {
    console.log(err)
  })
});
router.get('/course_details', function (req, res, next) {
  var courseList = url.parse(req.url, true).query.coursenm
  PAYPAL_URL = "https://www.sandbox.paypal.com/cgi-bin/webscr"
  PAYPAL_ID = "sb-jent52403752@business.example.com"
  userModel.fetchcourse_details(courseList).then((result) => {
    res.render("viewcourseDetails", {
      "result": result,
      "subcourseList": subcourseList,
      "sunm": req.session.sunm,
      "s_id": req.session.s_id,
      "PAYPAL_URL": PAYPAL_URL,
      "PAYPAL_ID": PAYPAL_ID,
      "courseList": courseList,
      "cstatus": cstatus
    })
  }).catch((err) => {
    console.log(err)
  })
  console.log("courseList....888888", courseList)
});
router.get('/payment', function (req, res, next) {
  urlData = url.parse(req.url, true).query
  userModel.payment(urlData).then((result) => {
    res.redirect('/user/usercourses')
  }).catch((err) => {
    console.log(err)
  })
});

router.get('/cancel', function (req, res, next) {
  res.render('cancel', { 'sunm': req.session.sunm });
});

router.get('/user_galary', function (req, res, next) {
  userModel.fetchgalary().then((result) => {
    res.render("user_galary", { "result": result, "sunm": req.session.sunm })
  }).catch((err) => {
    console.log(err)
  })
});
router.get('/usercourses', function (req, res, next) {
  userModel.CourseDetails().then((result) => {
    res.render("usercourses", { "result": result, "sunm": req.session.sunm, "s_id": req.session.s_id })
  }).catch((err) => {
    console.log(err)
  })
});
router.get('/user_events', function (req, res, next) {
  userModel.fetchEvents().then((result) => {
    res.render("user_events", { "result": result, moment: moment, "sunm": req.session.sunm })
  }).catch((err) => {
    console.log(err)
  })
});
router.get('/user_setting', function (req, res, next) {
  res.render("user_setting", { "sunm": req.session.sunm, 'msg': '' })
});
router.post('/user_setting', function (req, res, next) {
  userModel.chngPassword(req.session.email, req.body).then((result) => {
    res.render("user_setting", { "sunm": req.session.sunm, 'msg': result.msg })
  }).catch((err) => {
    console.log(err)
  })
});

router.get('/logout', function (req, res, next) {
  req.session.destroy()
  res.redirect("/login")
});

module.exports = router;
