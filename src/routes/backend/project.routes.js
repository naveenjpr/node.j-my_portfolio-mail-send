const express = require("express");
const route = express.Router();
const path = require("path");

const ProjectController = require("../../controllers/backend/project.controller");

const multer = require("multer");
const upload = multer({ dest: "uploads/Project" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/Project");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    var imagepath = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + imagepath);
  },
});

const uploadImage = multer({ storage: storage }).single("image");
// field name = image

module.exports = (app) => {
  // ============================
  // CREATE PROJECT (WITH IMAGE)
  // ============================
  route.post("/add", uploadImage, ProjectController.create);

  // ============================
  // VIEW ALL PROJECTS
  // ============================
  route.post("/view", ProjectController.view);

  // ============================
  // PROJECT DETAILS BY ID
  // ============================
  route.post("/details/:id", ProjectController.details);

  // ============================
  // UPDATE PROJECT (WITH IMAGE)
  // ============================
  route.put("/update/:id", uploadImage, ProjectController.update);

  // ============================
  // STATUS CHANGE (ACTIVE / INACTIVE)
  // ============================
  route.put("/statuschange/:id", ProjectController.statusChange);

  // ============================
  // DELETE PROJECT (SOFT DELETE)
  // ============================
  route.delete("/delete/:id", ProjectController.delete);

  // ============================
  // BASE ROUTE
  // ============================
  app.use("/api/backend/project", route);
};
// http://localhost:5000/api/backend/project/add
// http://localhost:5000/api/backend/project/view
// http://localhost:5000/api/backend/project/delete/:id
// http://localhost:5000/api/backend/project/statuschange/:id
// http://localhost:5000/api/backend/project/details/:id
// http://localhost:5000/api/backend/project/update/:id
