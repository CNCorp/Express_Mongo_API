const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  userId: { type: String, required: false },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

articleSchema.set("timestamps", true);

module.exports = mongoose.model("article", articleSchema);
