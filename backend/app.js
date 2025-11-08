require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const productsRoute = require('./Routes/product');
const cartRoute = require('./Routes/cart');
const checkoutRoute = require('./Routes/checkOut');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use('/products', productsRoute);
app.use('/cart', cartRoute);
app.use('/checkout', checkoutRoute);

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/mock-ecom";

mongoose
  .connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((err) => {
    console.error("Mongo connection error", err);
    process.exit(1);
  });

app.listen(PORT, () => console.log(`Server running `));
