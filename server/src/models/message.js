const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  message: {
    type: String,
    required: true,
  },
  communityId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
