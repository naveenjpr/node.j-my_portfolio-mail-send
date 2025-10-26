const mongoose = require("mongoose");

const MultiStepFrom = new mongoose.Schema({
  // Step 1: Personal Information
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  phone: {
    type: String,
    trim: true,
    required: [true, "phone is required"],
  },

  // Step 2: Address Information
  street: {
    type: String,
    required: [true, "Street address is required"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
  },
  state: {
    type: String,
    required: [true, "State is required"],
    trim: true,
  },
  zipCode: {
    type: String,
    trim: true,
  },

  // Step 3: Education Information
  highestDegree: {
    type: String,
    required: [true, "Highest degree is required"],
    enum: ["High School", "Associate", "Bachelor's", "Master's", "PhD"],
  },
  institution: {
    type: String,
    required: [true, "Institution is required"],
    trim: true,
  },
  graduationYear: {
    type: Number,
    min: 1900,
    max: 2030,
  },

  // Step 4: Work Experience
  company: {
    type: String,
    required: [true, "Company is required"],
    trim: true,
  },
  position: {
    type: String,
    required: [true, "Position is required"],
    trim: true,
  },
  years: {
    type: Number,
    min: 0,
    max: 50,
  },

  // Step 5: Job Preferences
  jobType: {
    type: String,
    required: [true, "Job type is required"],
    enum: ["Full-time", "Part-time", "Contract", "Remote"],
  },
  salary: {
    type: Number,
    required: [true, "Salary is required"],
    min: 0,
  },
  location: {
    type: String,
    trim: true,
  },

  // Metadata
  Status: {
        type: Boolean,
        default: true
    },
  
  created_at: Date,
    updated_at: Date,
    deleted_at: Date,
});

module.exports = mongoose.model("MultiStepFrom", MultiStepFrom);
