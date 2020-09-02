var express = require('express');
var nodemailer = require('nodemailer');
var indexModel = require('../modules/indexmodel')
var userModel = require('../modules/usermodel');
const url = require('url');
const sendMail = require('./mailapi')
const sendSMS = require('./smsapi')
var router = express.Router();

cunm = "";
cpass = "";
router.use("/login", (req, res, next) => {
  if (req.cookies.cunm != undefined) {
    cunm = req.cookies.cunm;
    cpass = req.cookies.cpass;
  }
  next();
});
/* Middleware to fetch courselist. */
router.use("/contact", (req, res, next) => {
  userModel.CourseDetails().then((result) => {
    courseList = result
    next();
  }).catch((err) => {
    console.log(err)
  })
})
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { "msg": "" });
});
router.get('/register', function (req, res, next) {
  res.render('register', { "msg": "" });
});
router.post('/register', function (req, res, next) {
  indexModel.registration(req.body).then((result) => {
    sendMail(req.body.email, req.body.password)
    sendSMS(req.body.mobile)
    res.render('register', result);
  }).catch((err) => {
    console.log(err)
  })
});

router.get('/verifyuser', function (req, res, next) {
  var emailid = url.parse(req.url, true).query.emailid
  indexModel.verifyuser(emailid).then((result) => {
    res.redirect('/login')
  }).catch((err) => {
    console.log(err)
  })
});

router.get('/login', function (req, res, next) {
  res.render('login', { "msg": "", 'cunm': cunm, 'cpass': cpass });
});
router.post('/login', function (req, res, next) {
  indexModel.login(req.body).then((result) => {
    if (result.length == 0)
      res.render('login', { 'msg': 'Invalid user please login again or verify account....', 'cunm': cunm, 'cpass': cpass });
    else {
      req.session.s_id = result[0]._id
      req.session.sunm = result[0].name
      req.session.email = result[0].email
      req.session.srole = result[0].role
      if (req.body.chk != undefined) {
        res.cookie("cunm", result[0].email, {
          expires: new Date(Date.now() + 900000),
        });
        res.cookie("cpass", result[0].password, {
          expires: new Date(Date.now() + 900000),
        });
      }
      if (result[0].role == "admin")
        res.redirect("/admin")
      else
        res.redirect("/user")
    }
  }).catch((err) => {
    console.log(err)
  })
});
router.get('/forgot_password', function (req, res, next) {
  res.render('forgot_password', { "msg": "" });
});
router.post('/forgot_password', function (req, res, next) {
  femail = req.body.femail
  indexModel.checkemailaccount(femail).then((result) => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rathoreankit607@gmail.com',
        pass: 'Akku@kki0728'
      }
    });

    var mailOptions = {
      from: 'rathoreankit607@gmail.com',
      to: femail,
      subject: "Verification mail for reset password",
      html: "<h1>Reset password...</h1><p>Click on the given link below to reset yor password</p><br>http://localhost:3000/reset_password?emailid=" + femail
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.render('forgot_password', { "msg": result.msg })
  }).catch((err) => {
    console.log(err)
  })
});
router.get('/reset_password', function (req, res, next) {
  res.render("reset_password", { "sunm": req.session.sunm, 'msg': '' })
});
router.post('/reset_password', function (req, res, next) {
  var femail = url.parse(req.url, true).query.emailid
  rpassDetails = req.body
  indexModel.resetPassword(femail, rpassDetails).then((result) => {
    res.render("reset_password", { "sunm": req.session.sunm, 'msg': result.msg })
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
  res.render('contact', { "msg": "", "courseList": courseList });
});
router.post('/contact', function (req, res, next) {
  contactDetails = req.body
  contactDetails.info = Date()
  indexModel.userQuery(contactDetails).then((result) => {
    console.log(contactDetails)
    res.render('contact', { msg: "we contact you soon", "courseList": courseList });
  }).catch((err) => {
    console.log(err)
  })
});
router.get('/logout', function (req, res, next) {
  req.session.destroy()
  res.redirect("/login")
});
module.exports = router; 
