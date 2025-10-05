const express = require("express");
const route = express.Router();
const navbar = require("../../controllers/frontend/Navbar.controller");

const multer = require("multer");
const upload = multer({ dest: "uploads/Navbar" });
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/Navbar");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    var imagepath = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + imagepath);
  },
});

const uploadImage = multer({ storage: storage }).single("logoUrl");

module.exports = (app) => {
  route.post("/add", uploadImage, navbar.create); //http://localhost:5000/api/backend/navbar/add
  route.get("/view", navbar.view); //http://localhost:5000/api/backend/navbar/view


  app.use("/api/backend/navbar", route);
};
