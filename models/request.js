const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email2: {
    type: String,
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

module.exports = mongoose.model("Req", requestSchema);
