const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommunitySchema = new Schema({
  communityId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Community", CommunitySchema);
