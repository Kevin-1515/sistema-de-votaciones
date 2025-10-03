const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  has_voted: { type: Boolean, default: false }
});

module.exports = mongoose.model("Voter", VoterSchema);