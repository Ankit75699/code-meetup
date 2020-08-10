var express = require('express');
var adminModel = require('../modules/adminModel');
var userModel = require('../modules/usermodel');
var url = require("url");
var path = require("path");
const { urlencoded } = require('express');
var router = express.Router();

var courseList
router.use("/course_Details", (req, res, next) => {
  userModel.CourseDetails().then((result) => {
    courseList = result
    next();
  }).catch((err) => {
    console.log(err)
  })
})


/* GET adminhome page. */
router.get('/', function (req, res, next) {
  res.render('adminhome', { "msg": "" });
});
router.get('/blog', function (req, res, next) {
  res.render('addblog', { "msg": "" });
});
router.post('/blog', function (req, res, next) {
  blogDetails = req.body
  var file3 = req.files.file3;
  var file3nm = Date.now() + "-" + file3.name;
  var file3path = path.join(__dirname, "../public/images/blog", file3nm);
  file3.mv(file3path);
  blogDetails.file3 = file3nm
  blogDetails.info = Date()
  adminModel.Addblog(blogDetails).then((result) => {
    res.render('addblog', result);
  }).catch((err) => {
    console.log(err)
  })
});
router.get('/addimages', function (req, res, next) {
  res.render('addimages', { "msg": "" });
});
router.get('/addevents', function (req, res, next) {
  res.render('addevents', { "msg": "" });
});
router.post('/addevents', function (req, res, next) {
  eventsDetails = req.body
  var file2 = req.files.file2;
  var file2nm = Date.now() + "-" + file2.name;
  var file2path = path.join(__dirname, "../public/images/events", file2nm);
  file2.mv(file2path);
  eventsDetails.file2 = file2nm
  eventsDetails.info = Date()
  adminModel.Addevents(eventsDetails).then((result) => {
    res.render('addevents', result);
  }).catch((err) => {
    console.log(err)
  })
});

router.get('/manageuser', function (req, res, next) {
  adminModel.fetchAll().then((result) => {
    res.render('manageuser', { result: result });
  }).catch((err) => {
    console.log(err)
  })
});
router.get('/manageuserstatus', function (req, res, next) {
  var statusDetails = url.parse(req.url, true).query;
  adminModel.manageuserstatus(statusDetails).then((result) => {
    res.redirect("/admin/manageuser");
  }).catch((err) => {
    console.log(err)
  })
});

router.get('/addcourses', function (req, res, next) {
  res.render('addcourses', { "msg": "" });
});
router.post('/addcourses', function (req, res, next) {
  addcourseDetails = req.body
  var file1 = req.files.file1;
  var file1nm = Date.now() + "-" + file1.name;
  var file1path = path.join(__dirname, "../public/images/courses", file1nm);
  file1.mv(file1path);
  courseDetails.file1 = file1nm
  courseDetails.info = Date()
  adminModel.courseupload(addcourseDetails).then((result) => {
    res.render('addcourses', result);
  }).catch((err) => {
    console.log(err)
  })
});
router.get('/course_Details', function (req, res, next) {
  res.render('course_details', { "msg": "", "courseList": courseList });
});
router.post('/course_Details', function (req, res, next) {
  subCoursesDetails = req.body
  var file5 = req.files.file5;
  var file5nm = Date.now() + "-" + file5.name;
  var file5path = path.join(__dirname, "../public/images/courses_details", file5nm);
  file5.mv(file5path);
  subCoursesDetails.file5 = file5nm
  subCoursesDetails.info = Date()
  adminModel.course_Details(subCoursesDetails).then((result) => {
    console.log(result)
    res.render('course_details', { msg: "Sub Cateory added successfully", "courseList": courseList });

  }).catch((err) => {
    console.log(err)
  })
});
router.get('/setting', function (req, res, next) {
  res.render('setting',);
});
router.get('/logout', function (req, res, next) {
  res.redirect('/login')
});
module.exports = router;