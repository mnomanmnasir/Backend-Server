const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
 
},
{ timestamps: true });

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
