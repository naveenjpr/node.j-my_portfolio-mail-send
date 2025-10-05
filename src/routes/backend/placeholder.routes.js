const express = require("express")
const route = express.Router()
const placeholder = require("../../controllers/backend/placeholder.controller")


module.exports = (app) => {


  route.post("/add",  placeholder.create) //http://localhost:5000/api/backend/placeholder/add

  route.get("/view",  placeholder.view) //http://localhost:5000/api/backend/placeholder/view

  route.get("/details/:id",  placeholder.details) //http://localhost:5000/api/backend/placeholder/details/64a7f3f6e4b0c9b1f0e4d2c1

  route.put("/update/:id",  placeholder.update) //http://localhost:5000/api/backend/placeholder/update/64a7f3f6e4b0c9b1f0e4d2c1


route.delete("/delete/:id", placeholder.delete);//http://localhost:5000/api/backend/placeholder/delete/64a7f3f6e4b0c9b1f0e4d2c1

  app.use("/api/backend/placeholder", route)
}
