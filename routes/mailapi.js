var nodemailer = require('nodemailer');

function sendMail(emailid, password) {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rathoreankit607@gmail.com',
      pass: 'aKku@jsr0207'
    }
  });

  var mailOptions = {
    from: 'rathoreankit607@gmail.com',
    to: emailid,
    subject: "Verification mail from iCoder:Heaven for programmer's",
    html: "<h1>Welcome to iCoder:Heaven for programmer's</h1><p>You have successfully registered , your login credentials are attached below & please click on link below to verify your account</p><h3>Username : " + emailid + "</h3><h3>Password : " + password + "</h3><br>  https://icoder-heaven-for-programmers.herokuapp.com/verifyuser?emailid=" + emailid
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendMail