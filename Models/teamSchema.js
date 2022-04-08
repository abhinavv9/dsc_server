const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  domain: {
    type: Number,
    required: true,
  },
  cardName: {
    type: String,
    required: true,
  },
  cardDesignation: {
    type: String,
    required: true,
  },
  images: {
    type: String,
  },
  links: {
    github: {
      type: String,
    },
    linkdin: {
      type: String,
    },
    instagram: {
      type: String,
    },
    behance: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Team", teamSchema);
