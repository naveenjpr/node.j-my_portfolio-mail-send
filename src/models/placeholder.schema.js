const mongoose = require("mongoose");

const placeholderSchema = new mongoose.Schema(
  {
  
    label: {
      type: String, 
  required: [true, "label is required"]
    },
    placeholder: {
      type: String, // input placeholder (ex: "Enter your email")
      default: "",
    },
   
  },
  { timestamps: true }
);

const Placeholder = mongoose.model("Placeholder", placeholderSchema);

module.exports = Placeholder;
