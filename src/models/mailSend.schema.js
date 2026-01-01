const mongoose = require("mongoose");
//आप बार-बार एक ही ईमेल पर मेल भेज सकते हैं।
const mailSendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true // इसे हटाने से डुप्लिकेट ईमेल सेव हो सकेगा
  },
  mobile: {
    type: Number,
    required: true,
    // unique: true // इसे हटाने से डुप्लिकेट ईमेल सेव हो सकेगा
  },
  message: {
    type: String,
    required: true,
  },
});
const mailSendModel = mongoose.model("mailSend", mailSendSchema);
module.exports = mailSendModel;

// const mongoose = require('mongoose');
// //एक ही Email पर सिर्फ एक बार मेल जाएगा।

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     message: {
//         type: String,
//         required: true
//     }
// });

// const userModel = mongoose.model("users", userSchema);
// module.exports = userModel;
