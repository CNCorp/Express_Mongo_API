const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rights: { type: Boolean, required: true },
  },
  { timestamps: true }
);

// userSchema.set("timestamps", true);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
