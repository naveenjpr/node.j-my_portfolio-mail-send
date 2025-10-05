
const NavbarModel = require("../../models/Navbar.Schema");

exports.create = (request, response) => {
  // normalize menuItems inline (aapka existing logic)
  let menuItems = request.body.menuItems;
  if (typeof menuItems === "string") {
    try { menuItems = JSON.parse(menuItems); }
    catch (e) { menuItems = menuItems.split(",").map(s => s.trim()).filter(Boolean); }
  }
  if (!Array.isArray(menuItems)) menuItems = [];

  const data = {
    menuItems,
    // set singleton flag so DB always knows this is the single doc
    singleton: true,
  };
 if (request.file && request.file.filename) {
    data["logoUrl"] = request.file.filename; // <- asi bhi likh sekte hai magar dono me se ake he
  }
  // upsert by singleton key
  NavbarModel.findOneAndUpdate(
    { singleton: true },       // filter -> always target same single doc
    { $set: data },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  )
    .then(result => {
      response.send({ status: true, message: "Navbar saved (upsert).", data: result });
    })
    .catch(error => {
      response.send({ status: false, message: "Something went wrong", error });
    });
};

exports.view = async (request, response) => {
  await NavbarModel.find()
    .sort({ _id: -1 })
    .then((result) => {
      if (result.length > 0) {
        result = result[0]; // <- yha pe hum latest data ko hi show karwana chahte hai isliye aise kiya hai
        const res = {
          status: true,
          message: "Navbar list",
          imagepath: "uploads/Navbar/",
          data: result,
        };
        response.send(res);
      } else {
        result = {};
      }
    })
    .catch((error) => {
      const res = {
        status: false,
        message: "Something went wrong",
        error: error,
      };
      response.send(res);
    });
};




// exports.delete = async(request,response) => {

// }
