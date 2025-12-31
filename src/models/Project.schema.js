const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  image: {
    type: String, // image URL or image name
    trim: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  technologies: [
    {
      type: String,
      trim: true,
    },
  ],

  github: {
    frontend: {
      type: String,
      trim: true,
    },
    backend: {
      type: String,
      trim: true,
    },
  },

  link: {
    type: String,
    trim: true,
  },

  // ✅ Status Field (NEW)
  status: {
    type: Boolean,
    default: true, // true = active, false = inactive
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

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;
