const express = require("express");
const router = express.Router();
const CartItem = require("../models/cartItem");
const Product = require("../models/product");

//  Get all cart items
router.get("/", async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate("productId");
    const total = cartItems.reduce(
      (sum, item) => sum + item.qty * (item.productId?.price || 0),
      0
    );
    res.json({ success: true, cartItems, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//  Add product to cart
router.post("/add", async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    // Check if already in cart
    const existing = await CartItem.findOne({ productId });
    if (existing) {
      existing.qty += 1;
      await existing.save();
      return res.json({ success: true, message: "Quantity updated", cartItem: existing });
    }

    const newItem = new CartItem({ productId, qty: 1 });
    await newItem.save();
    res.json({ success: true, message: "Added to cart", cartItem: newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//  Remove one item
router.delete("/:id", async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Item removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//  Clear entire cart (optional)
router.delete("/", async (req, res) => {
  try {
    await CartItem.deleteMany({});
    res.json({ success: true, message: "Cart cleared" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
