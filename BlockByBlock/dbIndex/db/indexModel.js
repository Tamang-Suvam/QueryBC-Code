const mongoose = require("mongoose");

const IndexSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: false,
      },
    blockNumber: {
      type: Number,
      required: true,
      unique: false,
    },
    transactionHash: {
      type: String,
      required: true,
      unique: true,
    }
})

module.exports = mongoose.model.Index || mongoose.model("Index", IndexSchema);