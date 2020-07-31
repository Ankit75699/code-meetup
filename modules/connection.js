const mongoose = require("mongoose")
const url = "mongodb://localhost:27017/icoder"
mongoose.connect(url)
const db = mongoose.connection
module.exports = db
