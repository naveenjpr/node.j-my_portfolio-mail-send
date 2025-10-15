const mongoose = require("mongoose");

const AddNewFieldSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
    trim: true
  },
  date: {
    type: String,
    // required: true
  },
  author: {
    type: String,
    // required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    // required: true//
  },
  
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
    default: null,
  },
});

const AddNewFieldModel = mongoose.model("AddNewField", AddNewFieldSchema);

module.exports = AddNewFieldModel;