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
  this.fetchEvents = () => {
    return new Promise((resolve, reject) => {
      db.collection("events").find().toArray((err, data) => {
        if (err)
          reject(err)
        else
          resolve(data)
        console.log("data.............", data)
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
        console.log("data.............", data)
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
  this.fetchcourse_details = (coursenm) => {
    return new Promise((resolve, reject) => {
      db.collection("courses_Details").find({ "coursenm": coursenm }).toArray((err, data) => {
        if (err)
          reject(err)
        else
          resolve(data)
        console.log("data.............", data)
      })
    })
  }
}
module.exports = new userModel()
