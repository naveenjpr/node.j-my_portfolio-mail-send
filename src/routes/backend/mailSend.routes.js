const express = require("express");
const route = express.Router();
const usercontroller = require("../../controllers/backend/mailSend.controller");

module.exports = (app) => {
  route.post("/send-mail", usercontroller.sendMail);

  app.use("/api/backend/mailSend", route);
};
//localhost:5000/api/backend/mailSend/send-mail
