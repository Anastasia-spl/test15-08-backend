const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, "Set date"],
  },
  name: {
    type: String,
    required: [true, "Set name"],
  },
  quantity: {
    type: Number,
    required: [true, "Set quantity"],
  },
  distance: {
    type: Number,
    required: [true, "Set distance"],
  },
  webhook: {
    type: Object
  }
});

const Tables = mongoose.model("Tables", tableSchema);

module.exports = {
  Tables
};
