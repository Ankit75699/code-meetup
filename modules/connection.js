const mongoose = require("mongoose")
const url = "mongodb+srv://Ankit607:akki1999@cluster0.mqhjc.mongodb.net/icoder?retryWrites=true&w=majority"
mongoose.connect(url)
const db = mongoose.connection
module.exports = db
