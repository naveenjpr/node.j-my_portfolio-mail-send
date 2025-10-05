const mongoose = require("mongoose");

const NavbarSchema = new mongoose.Schema({
  menuItems: {
    type: [String],
    default: [],
  },

  logoUrl: {
    type: String, // can be URL to uploaded file or base64 string
    default: "",
  },
    singleton: { type: Boolean, default: true, unique: true, sparse: true }, // NEW


  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    default: "",
  },
});

const NavbarModel = mongoose.model("NavbarNotes", NavbarSchema);

module.exports = NavbarModel;
