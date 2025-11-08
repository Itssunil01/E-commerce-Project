import React, { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  //  Fetch cart from backend
  useEffect(() => {
    fetch("http://localhost:3000/cart")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCart(data.cartItems || []);
          setTotal(data.total || 0);
        }
      })
      .catch(console.error);
  }, []);

  // Save total for checkout
  useEffect(() => {
    localStorage.setItem("total", total);
  }, [total]);

  //  Calculate subtotal and total dynamically
  useEffect(() => {
    const newTotal = cart.reduce(
      (sum, item) => sum + (item.productId?.price || 0) * (item.qty || 0),
      0
    );
    setTotal(newTotal);
  }, [cart]);

  //  Remove item handler
  const handleRemove = async (id) => {
    await fetch(`http://localhost:3000/cart/${id}`, { method: "DELETE" });
    const updated = cart.filter((c) => c._id !== id);
    setCart(updated);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => {
            const price = item.productId?.price || 0;
            const subtotal = price * item.qty;

            return (
              <div
                key={item._id}
                className="flex justify-between items-center border rounded p-4 shadow"
              >
                <div>
                  <h3 className="font-semibold">{item.productId?.name}</h3>
                  <p>Price: ₹{price}</p>
                  <p>Quantity: {item.qty}</p>
                  <p className="font-medium">Subtotal: ₹{subtotal}</p>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            );
          })}
          <div className="text-right text-lg font-bold mt-6">
            Total: ₹{total}
          </div>
        </div>
      )}
    </div>
  );
}
