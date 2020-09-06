const db = require('./connection')

const { collection, getMaxListeners } = require('./connection')
function indexModel() {
  this.userQuery = (contactDetails) => {
    console.log("indexmodel2222", contactDetails)
    return new Promise((resolve, reject) => {
      db.collection("Contact_us").find().toArray((err, data) => {
        if (data.length == 0)
          contactDetails._id = 1
        else {
          max_id = data[0]._id
          for (row of data) {
            if (max_id < row._id)
              max_id = row._id
          }
          contactDetails._id = max_id + 1
        }
        db.collection("Contact_us").insert(contactDetails, (err) => {
          if (err)
            reject(err)
          else
            resolve(true)
        })
      })
    })
  }
  this.registration = (userDetails) => {
    return new Promise((resolve, reject) => {
      db.collection("register").find({}).toArray((err, data) => {
        if (data.length == 0)
          userDetails._id = 1
        else {
          max_id = data[0]._id
          for (row of data) {
            if (max_id < row._id)
              max_id = row._id
          }
          userDetails._id = max_id + 1
        }
        userDetails.status = 0
        userDetails.role = "user"

        userDetails.info = Date()
        var userstatus = 0
        if (data.length != 0) {
          for (row of data) {
            if (row.email == userDetails.email) {
              resolve({ 'msg': 'Registration failed user already exists' })
              userstatus = 1
            }
          }
        }
        if (userstatus == 0) {
          db.collection("register").insert(userDetails, (err) => {
            if (err)
              reject(err)
            else
              resolve({ 'msg': 'Registration successfull verifycation is sent to your mail please click on the given link to verify yourself' })
          })
        }
      })
    })
  }

  this.verifyuser = (emailid) => {
    return new Promise((resolve, reject) => {
      db.collection("register").update({ 'email': emailid }, { $set: { 'status': 1 } }, (err) => {
        if (err)
          reject(err)
        else
          resolve(true)
      })
    })
  }
  this.checkemailaccount = (forgotemailDetails) => {
    return new Promise((resolve, reject) => {
      db.collection("register").find({ 'email': forgotemailDetails }).toArray((err, data) => {
        if (data.length == 0) {
          resolve({ "msg": "Account Not Found" })
        }
        else {
          if (err)
            reject(err)
          else {
            resolve({ "msg": "Password reset link has been sent to your mail.Please click on the given link to change your forgotten password" })
          }
        }
      })
    })
  }
  this.resetPassword = (remail, rpassDetails) => {
    return new Promise((resolve, reject) => {
      db.collection("register").find({ 'email': remail }).toArray((err, data) => {
        if (rpassDetails.setnewpass != rpassDetails.cnewpass) {
          resolve({ "msg": "New & confirm password not match" })
        }
        else {
          db.collection("register").update({ 'email': remail }, { $set: { 'password': rpassDetails.setnewpass } }, (err) => {
            if (err)
              reject(err)
            else
              resolve({ 'msg': 'Password changed successfully' })
          })
        }
      })
    })
  }

  this.login = (userDetails) => {
    return new Promise((resolve, reject) => {
      db.collection("register").find({ 'email': userDetails.email, 'password': userDetails.password, 'status': 1 }).toArray((err, data) => {
        if (err)
          reject(err)
        else
          resolve(data)
      })
    })
  }
}
module.exports = new indexModel()
