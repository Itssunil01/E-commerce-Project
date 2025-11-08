const express = require("express");
const router = express.Router();
const Product = require("../models/product");

//  Seed demo products (run once)
router.get("/seed", async (req, res) => {
  try {
    const products = [
      { name: "Wireless Headphones", price: 2999, image: "https://hammeronline.in/cdn/shop/files/HammerBluetoothHeadphones.webp?v=1695284815&width=1080" },
      { name: "Smart Watch", price: 4999, image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/b688ece7-b829-4a76-8ed2-b2152f13f8f3.__CR0,0,300,300_PT0_SX300_V1___.png" },
      { name: "Bluetooth Speaker", price: 1999, image: "https://images.unsplash.com/photo-1593642532744-d377ab507dc8" },
      { name: "Gaming Mouse", price: 1499, image: "https://thumbs.dreamstime.com/b/modern-gaming-mouse-illuminated-rgb-lighting-gradient-background-creates-vibrant-colorful-atmosphere-against-perfect-386733774.jpg" },
      { name: "Laptop Stand", price: 999, image: "https://rukminim3.flixcart.com/image/546/564/xif0q/shopsy-laptop-stand/h/y/5/300-ergonomic-tablet-laptop-stand-also-for-read-book-novel-r-original-imagnu7j3skx6wsh.jpeg?q=60" },
      { name: "USB-C Hub", price: 799, image: "https://media.gettyimages.com/id/1350555769/photo/usb-c-hub-docking-station-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=He9oeOxGzfek7CAMG-Gbo-R7Gg83wSW09fstVks3Jhg=" },
      { name: "Mechanical Keyboard", price: 3499, image: "https://www.redragon.in/cdn/shop/files/1_3ef5b4b8-beff-4e5a-b884-b5061da7fafb.png?v=1737030171&width=1000" },
      { name: "Webcam 1080p", price: 2499, image: "https://cdn.thewirecutter.com/wp-content/media/2025/01/BEST-WEBCAMS-2048px-00469.jpg?auto=webp&quality=75&width=1024" }
    ];

    // Optional: Clear old data before inserting new demo data
    await Product.deleteMany({});
    await Product.insertMany(products);

    res.json({ success: true, message: "Demo products added successfully!" });
  } catch (err) {
    console.error(" Error seeding products:", err);
    res.status(500).json({ success: false, message: "Server error while seeding products" });
  }
});

//  Fetch all products (for homepage)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.json({ success: false, message: "No products found" });
    }
    res.json({ success: true, products });
  } catch (err) {
    console.error(" Error fetching products:", err);
    res.status(500).json({ success: false, message: "Server error while fetching products" });
  }
});

module.exports = router;
