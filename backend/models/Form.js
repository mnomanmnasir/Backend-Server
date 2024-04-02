const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema(
  {
    // Define schema fields for form data
    // For example:
    name: String,
    email: String,
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", FormSchema);
