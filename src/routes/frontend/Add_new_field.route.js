const express = require("express");
const route = express.Router();
const Addnewfield = require("../../controllers/frontend/Add_new_field.controller");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/Addnewfield");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    var imagepath = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + imagepath);
  },
});

const uploadImage = multer({ storage: storage }).single("imageUrl");

module.exports = (app) => {
  // Create new field with image upload
  route.post('/add', uploadImage, Addnewfield.create);

  // Get all fields
  route.post('/view', Addnewfield.view);

  // Get single field by ID
  // route.post('/details/:id', Addnewfield.details);

  // Update field with image upload
  // route.put('/update/:id', uploadImage, Addnewfield.update);

  // Delete field
  // route.delete('/delete/:id', Addnewfield.delete);

  app.use('/api/frontend/Addnewfield', route);
};
//localhost:5000/api/backend/Addnewfield/add
//localhost:5000/api/backend/Addnewfield/view
//localhost:5000/api/backend/Addnewfield/details/:id
//localhost:5000/api/backend/Addnewfield/update/:id
//localhost:5000/api/backend/Addnewfield/delete/:id