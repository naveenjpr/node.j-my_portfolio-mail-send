const mongoose = require("mongoose")
//आप बार-बार एक ही ईमेल पर मेल भेज सकते हैं।
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  mobile: {
    type: String,
    required: true,
    match: [/^(\+91[\s]?)?[6-9]\d{9}$/, "Please enter a valid mobile number"],
  },
  message: {
    type: String,
    required: true,
  },
})
const userModel = mongoose.model("users", userSchema)
module.exports = userModel
