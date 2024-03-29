const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");


// Get all inventory items
router.get("/", async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();
    res.json(inventoryItems);
  } catch (err) {
    console.error('Error submitting form:', err);

    res.status(500).json({ message: err.message });
  }
});

// Get a specific inventory item
router.get("/:id", getInventoryItem, (req, res) => {
  res.json(res.inventoryItem);
});

// Create a new inventory item
router.post("/", async (req, res) => {
  const inventoryItem = new Inventory({
    productName: req.body.productName,
    category: req.body.category,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
  });

  try {
    const newInventoryItem = await inventoryItem.save();
    res.status(201).json(newInventoryItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing inventory item
router.patch("/:id", getInventoryItem, async (req, res) => {
  if (req.body.productName != null) {
    res.inventoryItem.productName = req.body.productName;
  }
  if (req.body.category != null) {
    res.inventoryItem.category = req.body.category;
  }
  if (req.body.quantity != null) {
    res.inventoryItem.quantity = req.body.quantity;
  }
  if (req.body.price != null) {
    res.inventoryItem.price = req.body.price;
  }
  if (req.body.description != null) {
    res.inventoryItem.description = req.body.description;
  }
  try {
    const updatedInventoryItem = await res.inventoryItem.save();
    res.json(updatedInventoryItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an inventory item
router.delete("/:id", getInventoryItem, async (req, res) => {
  try {
    await res.inventoryItem.remove();
    res.json({ message: "Inventory item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getInventoryItem(req, res, next) {
  let inventoryItem;
  try {
    inventoryItem = await Inventory.findById(req.params.id);
    if (inventoryItem == null) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.inventoryItem = inventoryItem;
  next();
}

module.exports = router;
