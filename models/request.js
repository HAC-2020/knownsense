const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  panic: {
    type: Boolean,
    default: false,
  },
  session: {
    type: String,
    default: 'NO',
  },
  docId: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Request", requestSchema);
