const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const server = express()
server.use(cors())

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use('/uploads/Navbar', express.static('uploads/Navbar'));



server.get("/", (request, response) => {
  response.send("Server Working Fine.....")
})

require('./src/routes/frontend/user.routes')(server);
require('./src/routes/backend/placeholder.routes')(server);
require('./src/routes/frontend/Navbar.routes')(server);

server.get("*", (request, response) => {
  response.send("Page not found.....")
})

//naveensainijpr
//Gionee123

mongoose
  .connect(
    `mongodb+srv://naveensainijpr:Gionee123@cluster0.dzazkmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    server.listen("5000", () => {
      console.log("Database Connected!")
    })
  })
  .catch((error) => {
    console.log("Database Not Connected!" + error)
  })

  