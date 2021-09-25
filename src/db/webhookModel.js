const mongoose = require("mongoose");

const webhookSchema = new mongoose.Schema({
  webhook: {
    type: Object
  }
});

const Hooks = mongoose.model("Hooks", webhookSchema);

module.exports = {
  Hooks
};
