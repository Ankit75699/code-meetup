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
  this.courseupload = (addcourseDetails) => {
    return new Promise((resolve, reject) => {
      db.collection("courses").find().toArray((err, data) => {
        if (data.length == 0)
          addcourseDetails._id = 1
        else {
          max_id = data[0]._id
          for (row of data) {
            if (max_id < row._id)
              max_id = row._id
          }
          addcourseDetails._id = max_id + 1
        }
        db.collection("courses").insert(addcourseDetails, (err) => {
          if (err)
            reject(err)
          else
            resolve({ 'msg': 'Courses inserted successfully' })
        })
      })

    })
  }
  this.Addgalary = (galaryDetails) => {
    return new Promise((resolve, reject) => {
      db.collection("add_galary").find().toArray((err, data) => {
        if (data.length == 0)
          galaryDetails._id = 1
        else {
          max_id = data[0]._id
          for (row of data) {
            if (max_id < row._id)
              max_id = row._id
          }
          galaryDetails._id = max_id + 1
        }
        db.collection("add_galary").insert(galaryDetails, (err) => {
          if (err)
            reject(err)
          else
            resolve(true)
        })
      })
    })
  }
  this.Addevents = (eventsDetails) => {
    return new Promise((resolve, reject) => {
      db.collection("events").find().toArray((err, data) => {
        if (data.length == 0)
          eventsDetails._id = 1
        else {
          max_id = data[0]._id
          for (row of data) {
            if (max_id < row._id)
              max_id = row._id
          }
          eventsDetails._id = max_id + 1
        }
        db.collection("events").insert(eventsDetails, (err) => {
          if (err)
            reject(err)
          else
            resolve({ "msg": "Event Inserted successfully" })
        })
      })
    })
  }
  this.Addblog = (blogDetails) => {
    return new Promise((resolve, reject) => {
      db.collection("blogs").find().toArray((err, data) => {
        if (data.length == 0)
          blogDetails._id = 1
        else {
          max_id = data[0]._id
          for (row of data) {
            if (max_id < row._id)
              max_id = row._id
          }
          blogDetails._id = max_id + 1
        }
        db.collection("blogs").insert(blogDetails, (err) => {
          if (err)
            reject(err)
          else
            resolve(true)
        })
      })
    })
  }
  this.course_Details = (subCoursesDetails) => {
    return new Promise((resolve, reject) => {
      db.collection("courses_Details").find().toArray((err, data) => {
        if (data.length == 0)
          subCoursesDetails._id = 1
        else {
          max_id = data[0]._id
          for (row of data) {
            if (max_id < row._id)
              max_id = row._id
          }
          subCoursesDetails._id = max_id + 1
        }
        db.collection("courses_Details").insert(subCoursesDetails, (err) => {
          if (err)
            reject(err)
          else
            resolve(true)
        })
      })
    })
  }
  this.AddIndex = (indexDetails) => {
    return new Promise((resolve, reject) => {
      db.collection("add_index").find().toArray((err, data) => {
        if (data.length == 0)
          indexDetails._id = 1
        else {
          max_id = data[0]._id
          for (row of data) {
            if (max_id < row._id)
              max_id = row._id
          }
          indexDetails._id = max_id + 1
        }
        db.collection("add_index").insert(indexDetails, (err) => {
          if (err)
            reject(err)
          else
            resolve(true)
        })
      })
    })
  }
  this.fetch_Visitorquery = () => {
    return new Promise((resolve, reject) => {
      db.collection('Contact_us').find({}).toArray((err, data) => {
        if (err)
          reject(err)
        else
          resolve(data)
        console.log("data.......", data)
      })
    })
  }
}
module.exports = new adminModel()
