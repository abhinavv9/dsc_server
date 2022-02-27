const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  domain: {
    type: Number,
    required: true,
  },
  year: {
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
    linkdin: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Alumni", alumniSchema);
