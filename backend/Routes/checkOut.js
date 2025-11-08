const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const CartItem = require("../models/cartItem");
const Product = require("../models/product");

router.post("/", async (req, res) => {
  try {
    const { cartItems, customer } = req.body;
    console.log("Checkout request body:", req.body);

    let items = cartItems;

    if (!items) {
      const dbItems = await CartItem.find().populate("productId");
      items = dbItems.map((i) => ({ product: i.productId, qty: i.qty }));
    }

    // ensure items is an array
    if (!Array.isArray(items)) items = [items];

    const enriched = items.map((it) => {
      const productData = it.product || it.productId;

      // handle missing product
      if (!productData) {
        return {
          product: { id: null, name: "Unknown", price: 0 },
          qty: it.qty ?? 1,
          lineTotal: 0,
        };
      }

      const price = productData.price ?? 0;
      return {
        product: { id: productData._id, name: productData.name, price },
        qty: it.qty ?? 1,
        lineTotal: (it.qty ?? 1) * price,
      };
    });

    const total = enriched.reduce((s, e) => s + e.lineTotal, 0);
    const order = await Order.create({ items: enriched, total, customer });

    await CartItem.deleteMany({});
    res.json({
      success: true,
      receipt: {
        id: order._id,
        total: order.total,
        timestamp: order.createdAt,
        items: order.items,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
