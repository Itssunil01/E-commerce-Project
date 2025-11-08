const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Must match the model name in product.js
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model("CartItem", cartItemSchema);
