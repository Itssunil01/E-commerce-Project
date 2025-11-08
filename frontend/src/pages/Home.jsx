import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Button, CircularProgress } from "@mui/material";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:3000/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      if (data.success) {
        alert(" Product added to cart!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Failed to add to cart");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6"> Featured Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product._id}
            className="shadow-md rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
              className="object-cover"
            />
            <CardContent className="text-center">
              <Typography variant="h6" className="font-semibold mb-1">
                {product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" className="mb-2">
                ₹{product.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => addToCart(product._id)}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
