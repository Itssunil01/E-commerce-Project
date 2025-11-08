require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product');

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/mock-ecom';

const items = [
  { name: "Vibe T-Shirt", price: 249, image: "", description: "Soft cotton tee." },
  { name: "Vibe Hoodie", price: 999, image: "", description: "Comfy hoodie." },
  { name: "Vibe Cap", price: 199, image: "", description: "Stylish cap." },
  { name: "Vibe Mug", price: 149, image: "", description: "Ceramic mug." },
  { name: "Vibe Sticker Pack", price: 49, image: "", description: "Fun stickers." }
];

mongoose.connect(MONGO)
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(items);
    console.log('Seeded products');
    process.exit(0);
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
