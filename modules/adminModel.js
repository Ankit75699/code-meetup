const db = require('./connection')
const { collection, getMaxListeners } = require('./connection')
function adminModel() {
  this.fetchAll = () => {
    return new Promise((resolve, reject) => {
      db.collection('register').find({ 'role': 'user' }).toArray((err, data) => {
        if (err)
          reject(err)
        else
          resolve(data)
        console.log("data.......", data)
      })
    })
  }
  this.manageuserstatus = (statusDetails) => {
    return new Promise((resolve, reject) => {
      if (statusDetails.s == "block") {
        db.collection("register").update({ '_id': parseInt(statusDetails.regid) }, { $set: { 'status': 0 } }, (err) => {
          if (err)
            reject(err)
          else
            resolve({ 'status': 1 })
        })

      }
      else if (statusDetails.s == "unblock") {
        db.collection("register").update({ '_id': parseInt(statusDetails.regid) }, { $set: { 'status': 1 } }, (err) => {
          if (err)
            reject(err)
          else
            resolve({ 'status': 1 })
        })
      }
      else {
        db.collection("register").remove({ '_id': parseInt(statusDetails.regid) }, (err) => {
          if (err)
            reject(err)
          else
            resolve({ 'status': 1 })
        })
      }
    })
  }
  this.courseupload = (courseDetails) => {
    console.log("adminmodel courseDetails...........", courseDetails)
    return new Promise((resolve, reject) => {
      db.collection("courses").insert(courseDetails, (err) => {
        if (err)
          reject(err)
        else
          resolve({ 'msg': 'Courses inserted successfully' })
      })
    })
  }
}
module.exports = new adminModel()