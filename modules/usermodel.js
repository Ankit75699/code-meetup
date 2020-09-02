const db = require('./connection')
const { collection, getMaxListeners } = require('./connection')
function userModel() {
  this.CourseDetails = () => {
    return new Promise((resolve, reject) => {
      db.collection('courses').find().toArray((err, data) => {
        if (err)
          reject(err)
        else
          resolve(data)
      })
    })
  }
  this.fetchgalary = () => {
    return new Promise((resolve, reject) => {
      db.collection("add_galary").find().toArray((err, data) => {
        if (err)
          reject(err)
        else
          resolve(data)
      })
    })
  }
  this.fetchEvents = () => {
    return new Promise((resolve, reject) => {
      db.collection("events").find().toArray((err, data) => {
        if (err)
          reject(err)
        else
          resolve(data)
      })
    })
  }
  this.fetchBlog = () => {
    return new Promise((resolve, reject) => {
      db.collection("blogs").find().toArray((err, data) => {
        if (err)
          reject(err)
        else
          resolve(data)
      })
    })
  }
  this.fetchcourse_details = (courseList) => {
    return new Promise((resolve, reject) => {
      db.collection("courses_Details").find({ "courseList": courseList }).toArray((err, data) => {
        if (err)
          reject(err)
        else
          resolve(data)
      })
    })
  }
  this.fetchsubcourse_details = (courseList) => {
    return new Promise((resolve, reject) => {
      db.collection("add_index").find({ "courseList": courseList }).toArray((err, data) => {
        if (err)
          reject(err)
        else
          resolve(data)
      })
    })
  }
  this.course_status = (coursestatus) => {
    return new Promise((resolve, reject) => {
      db.collection("user_courses_status").find({ 'coursenm': coursestatus.coursenm, 's_id': coursestatus.s_id }).toArray((err, data) => {
        if (data.length != 0) {
          resolve(false)
        }
        else {
          db.collection("user_courses_status").insert(coursestatus, (err) => {
            if (err)
              reject(err)
            else
              resolve(true)
          })
        }
      })
    })
  }
  this.Fetch_cstatusDetails = () => {
    return new Promise((resolve, reject) => {
      db.collection("user_courses_status").find({}).toArray((err, data) => {
        if (err)
          reject(err)
        else
          resolve(data)
      })
    })
  }
  this.payment = (urlData) => {
    return new Promise((resolve, reject) => {
      db.collection("payment").find().toArray((err, data) => {
        console.log("urlData/////", urlData)
        if (err)
          reject(err)
        else {
          if (data.length == 0)
            urlData._id = 1
          else {
            max_id = data[0]._id
            for (row of data) {
              if (max_id < row._id)
                max_id = row._id
            }
            urlData._id = max_id + 1
            urlData.info = Date()
          }
          db.collection("payment").insert(urlData, (err) => {
            if (err)
              reject(err)
            else {
              db.collection('user_courses_status').update({ 'coursenm': urlData.coursenm }, { $set: { 'cstatus': 1 } }, (err) => {
                if (err)
                  reject(err)
                else
                  resolve(true)

              })
            }
          })
        }
      })

    })
  }
  this.chngPassword = (email, cpassDetails) => {
    return new Promise((resolve, reject) => {
      db.collection("register").find({ 'email': email, 'password': cpassDetails.oldpass }).toArray((err, data) => {
        if (err)
          reject(err)
        else {
          if (data.length == 0)
            resolve({ 'msg': 'Old password does not match' })
          else if (cpassDetails.newpass == cpassDetails.cnfrmpass) {
            db.collection("register").update({ 'email': email }, { $set: { 'password': cpassDetails.newpass } }, (err) => {
              if (err)
                reject(err)
              else
                resolve({ 'msg': 'Password changed successfully' })
            })
          }
          else
            resolve({ 'msg': 'New & Confirm new password does not match' })

        }
      })
    })
  }
}
module.exports = new userModel()
