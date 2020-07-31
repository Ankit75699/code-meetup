var express = require('express');
var adminModel = require('../modules/adminModel');
var url = require("url");
var path = require("path");
const { urlencoded } = require('express');
var router = express.Router();

/* GET adminhome page. */
router.get('/', function (req, res, next) {
  res.render('adminhome', { "msg": "" });
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
router.get('/addcourses', function (req, res, next) {
  courseDetails = req.body
  var file1 = req.files.file1;
  var file1nm = Date.now() + "-" + file1.name;
  var file1path = path.join(__dirname, "../public/courses", file1nm);
  file1.mv(file1path);
  courseDetails.file1 = file1nm
  courseDetails.info = Date()
  console.log("courseDetails...........", courseDetails)
  adminModel.courseupload(courseDetails).then((result) => {
    console.log("result...........", result)
    res.render('addcourses', result);
  }).catch((err) => {
    console.log(err)
  })
});
router.get('/setting', function (req, res, next) {
  res.render('setting', { "msg": "" });
});
router.get('/logout', function (req, res, next) {
  res.redirect('/login')
});
module.exports = router;