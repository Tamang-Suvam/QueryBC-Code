const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    address: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: false,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    role: {
      type: String,
      required: true,
      unique: false,
    },
    department: {
      type: String,
      required: false,
      unique: false,
    },
})

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);